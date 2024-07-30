var express = require("express");
const Response = require("../lib/response");
const User = require("../database/models/Users");
const _enum = require("../config/enum");
const bcrypt = require("bcryptjs");
const logger = require("../lib/logger/logger");
const auditLogs = require("../lib/auditLogs");
const generateWithAI = require("../lib/gemini-ai");

var router = express.Router();

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, imageUrl, emailConfirmed } = req.body;


    let user = await User.findOne({ email: email });

    if (user && user.emailConfirmed == true) {
      return res
        .status(_enum.HTTP_CODES.OK)
        .json({ success: false, message: "Emailiniz Zaten Kayıtlı!!" });
    } else if (user && user.emailConfirmed == false) {
      await User.findByIdAndDelete(user.id);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    var newUser = await User({
      username: username,
      email: email,
      password: password,
      imageUrl: imageUrl,
      emailConfirmed: emailConfirmed ? true : false,
    }).save();

    res
      .status(_enum.HTTP_CODES.CREATED)
      .json(Response.successResponse({ success: true, id: newUser.id }));
  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Users", "POST /register", error);
    logger.error(req.user?.id || "User", "Users", "POST /register", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

router.post("/email-confirmed", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await User.findByIdAndUpdate(
      id,
      { emailConfirmed: true },
      { new: true }
    );

    if (!result) {
      return res
        .status(_enum.HTTP_CODES.CREATED)
        .json(Response.successResponse({ success: false }));
    }

    return res
      .status(_enum.HTTP_CODES.CREATED)
      .json(Response.successResponse({ success: true }));
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Users",
      "POST /email-confirm",
      error
    );
    logger.error(req.user?.id || "User", "Users", "POST /email-confirm", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

router.post("/update-user", async (req, res) => {
  try {
    const { id, username } = req.body;
    console.log(req.body);

    const usedUsername = await User.find({
      username: username,
    }).countDocuments();

    if (usedUsername > 0) {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Bu Kullanıcı Adı Alınmış!!",
        })
      );
    }

    const result = await User.findByIdAndUpdate(
      id,
      { username: username },
      { new: true }
    );

    if (!result) {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Bir Hata Oluştu!!",
        })
      );
    }

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        message: "Kullanıcı Adı Alınabilir!",
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Users",
      "POST /update-user",
      error
    );
    logger.error(req.user?.id || "User", "Users", "POST /update-user", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

router.post("/exist-user", async (req, res) => {
  try {
    const { username } = req.body;

    const result = await User.find({
      $or: [
        { username: username.toUpperCase() },
        { username: username.toLowerCase() },
      ],
    }).countDocuments();

    if (result > 0) {
      const userListArray = await User.find().select("username");
      const user = {
        username: username,
        userList: userListArray,
      };
      const suggestion = await generateWithAI(user);
      res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Bu Kullanıcı Adı Alınmış!!",
          suggestion: suggestion.suggestion,
        })
      );
    } else {
      res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: true,
          message: "Kullanıcı Adı Alınabilir!",
        })
      );
    }
  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Users", "POST /exist-user", error);
    logger.error(req.user?.id || "User", "Users", "POST /exist-user", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  console.log(username);
  const exist = await User.find({ username: username }).countDocuments();
  console.log(exist);
  if (exist > 0) {
    const result = await User.find().select("username");
    const user = {
      username: username,
      userList: result,
    };
    const suggestion = await generateWithAI(user);
    console.log(suggestion);
    return res.json(suggestion);
  }
  return res.json(true);
});


router.get("/get-user-list", async (req,res)=>{
  try {
    const user = await User.find({}).select("_id username email imageUrl bioDesc")
   
    res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        user: user,
      })
    );

  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Users", "GET /get-user-list", error);
    logger.error(req.user?.id || "User", "Users", "GET /get-user-list", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
})

router.post("/get-user", async (req,res)=>{
  try {
    const user = await User.findOne({email:req.body.email}).select("_id username email imageUrl bioDesc")
   
    res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        user: user,
      })
    );

  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Users", "POST /get-user", error);
    logger.error(req.user?.id || "User", "Users", "POST /get-user", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
})

module.exports = router;
