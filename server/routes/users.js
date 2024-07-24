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
    const { username, email, password } = req.body;
    console.log(req.body)

    let user = await User.findOne({ username: username });

    if (user) {
      return res
        .status(_enum.HTTP_CODES.OK)
        .json({ success: false, message: "Emailiniz Zaten Kayıtlı!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User({
      username: username,
      email: email,
      password: password,
    }).save();

    res
      .status(_enum.HTTP_CODES.CREATED)
      .json(Response.successResponse({ success: true }));
  } catch (error) {
    auditLogs.error(req.user?.id || "User", "Users", "POST /register", error);
    logger.error(req.user?.id || "User", "Users", "POST /register", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

module.exports = router;
