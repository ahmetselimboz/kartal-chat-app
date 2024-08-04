var express = require("express");
const Response = require("../lib/response");
const User = require("../database/models/Users");
const _enum = require("../config/enum");
const bcrypt = require("bcryptjs");
const logger = require("../lib/logger/logger");
const auditLogs = require("../lib/auditLogs");
const generateWithAI = require("../lib/gemini-ai");
const Chat = require("../database/models/Chat");
var router = express.Router();

//Kullanıcı Kaydı İşlemi
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

    var newUser = await User({
      username: username,
      email: email,
      password: password,
      imageUrl: imageUrl,
      emailConfirmed: emailConfirmed ? true : false,
    }).save();

    return res
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

//Kullanıcı Emaıl Doğrulama İşlemi
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

//Kullanıcı Adı Güncelleme İşlemi
router.post("/update-user", async (req, res) => {
  try {
    const { id, username } = req.body;

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

//Kullanıcı Adı Daha Önce Kullanılmış Mı Kontrol Etme İşlemi
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
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Bu Kullanıcı Adı Alınmış!!",
          suggestion: suggestion.suggestion,
        })
      );
    } else {
      return res.status(_enum.HTTP_CODES.CREATED).json(
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

//Tüm Kullanıcıları Liste Halinde Döndürme İşlemi
router.get("/get-user-list", async (req, res) => {
  try {
    const user = await User.find({}).select(
      "_id username email imageUrl bioDesc userStatus  createdAt updatedAt"
    );

    res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        user: user,
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Users",
      "GET /get-user-list",
      error
    );
    logger.error(req.user?.id || "User", "Users", "GET /get-user-list", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

//Belirtilen Tek Bir Kullanıcıyı Döndürme İşlemi
router.post("/get-user", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ _id: req.body.id }, { email: req.body.email }],
    }).select(
      "_id username email imageUrl bioDesc userStatus  createdAt updatedAt"
    );

    return res.status(_enum.HTTP_CODES.CREATED).json(
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
});

//Belirtilen Kullanıcıya Bildirim Gönderme İşlemi
router.post("/invite-friend", async (req, res) => {
  try {
    const { senderId, senderUsername, slug, receiverId } = req.body;
    const control = await User.findOne({
      _id: receiverId,
      notification: {
        $elemMatch: { slug: slug, senderId: senderId },
      },
    });

    if (control) {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Zaten Davet Göndermişsiniz!",
        })
      );
    }

    const friendControl = await User.findOne({
      _id: receiverId,
      friends: {
        $elemMatch: { senderId: senderId },
      },
    });

    if (friendControl) {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Zaten Arkadaşsınız!",
        })
      );
    }

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        message: "Davetiniz Gönderildi!",
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Users",
      "POST /invite-friend",
      error
    );
    logger.error(req.user?.id || "User", "Users", "POST /invite-friend", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

//Kullanıcıya Gelen Bildirimlerini Döndürme İşlemi
router.post("/get-notification", async (req, res) => {
  try {
    const { username } = req.body;

    const result = await User.findOne({ username: username }).select(
      "notification"
    );

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        list: result,
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Users",
      "POST /get-notification",
      error
    );
    logger.error(
      req.user?.id || "User",
      "Users",
      "POST /get-notification",
      error
    );
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

//Okunan Bildirimleri Silme İşlemi
router.get("/remove-notification", async (req, res) => {
  try {
    const { id, username } = req.query;

    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      {
        $pull: { notification: { _id: id } },
      },
      { new: true }
    );

    if (updatedUser) {
      res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: true,
        })
      );
    } else {
      res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
        })
      );
    }
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Users",
      "GET /remove-notification",
      error
    );
    logger.error(
      req.user?.id || "User",
      "Users",
      "GET /remove-notification",
      error
    );
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

//Arkadaş Ekleme İşlemi
router.post("/add-friend", async (req, res) => {
  try {
    const { from, to } = req.body;

    const friendControl = await User.findOne({
      _id: to,
      friends: {
        $elemMatch: { _id: from },
      },
    });

    const friendControl2 = await User.findOne({
      _id: from,
      friends: {
        $elemMatch: { _id: to },
      },
    });

    if (friendControl || friendControl2)
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Zaten Arkadaşsınız!",
        })
      );
    const members = [{ memberId: to }, { memberId: from }];
    const newChat = new Chat({
      participants: {
        members: members,
      },
      messages: [],
    });
    await newChat.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: to },
      {
        $push: {
          friends: { userId: from, chatId: newChat._id },
        },
      },
      { new: true }
    );

    const updatedUser2 = await User.findOneAndUpdate(
      { _id: from },
      {
        $push: {
          friends: { userId: to, chatId: newChat._id },
        },
      },
      { new: true }
    );

    if (updatedUser && updatedUser2) {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: true,
          message: "Kabul Edildi!",
        })
      );
    } else {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Kabul Edilemedi! Tekrar Deneyiniz!",
        })
      );
    }
  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Users", "POST /add-friend", error);
    logger.error(req.user?.id || "User", "Users", "POST /add-friend", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

//Kullanıcıya Arkadaş Listesini Döndürme İşlemi
router.post("/get-friends", async (req, res) => {
  try {
    const { username, id } = req.body;

    const user = await User.findOne({
      $or: [{ _id: id }, { username: username }],
    }).exec();

    if (!user) {
      throw new Error("User not found");
    }

    const friendUsernames = user.friends.map((friend) => friend.userId);

    const friends = await User.find({ _id: { $in: friendUsernames } })
      .select(
        "username imageUrl bioDesc userStatus friends createdAt updatedAt"
      )
      .exec();

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        list: friends,
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Users", "POST /get-friend", error);
    logger.error(req.user?.id || "User", "Users", "POST /get-friend", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});




module.exports = router;
