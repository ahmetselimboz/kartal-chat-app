var express = require("express");
const Response = require("../lib/response");
const User = require("../database/models/Users");
const _enum = require("../config/enum");
const bcrypt = require("bcryptjs");
const logger = require("../lib/logger/logger");
const auditLogs = require("../lib/auditLogs");

var router = express.Router();

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, imageUrl, emailConfirmed } = req.body;
    console.log(req.body);

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
      res
        .status(_enum.HTTP_CODES.CREATED)
        .json(Response.successResponse({ success: false }));
    }

    res
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
    const result = await User.findByIdAndUpdate(
      id,
      { username: username },
      { new: true }
    );
    console.log(result);
    if (!result) {
      res
        .status(_enum.HTTP_CODES.CREATED)
        .json(Response.successResponse({ success: false }));
    }

    res
      .status(_enum.HTTP_CODES.CREATED)
      .json(Response.successResponse({ success: true }));
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

module.exports = router;
