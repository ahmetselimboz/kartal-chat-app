var express = require("express");
const Response = require("../lib/response");
const _enum = require("../config/enum");
const logger = require("../lib/logger/logger");
const auditLogs = require("../lib/auditLogs");
const Chat = require("../database/models/Chat");
var router = express.Router();

router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(_enum.HTTP_CODES.CREATED).json(
        Response.successResponse({
          success: false,
          message: "Sohbet Bulunamadı!",
        })
      );
    }

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        chat: chat,
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Chat", "GET /:chatId", error);
    logger.error(req.user?.id || "User", "Chat", "GET /:chatId", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

router.post("/", async (req, res) => {
  try {
    const { participants } = req.body;
    console.log(req.body)
    const newChat = new Chat({ participants, messages: [] });
    await newChat.save();

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        newChat: newChat,
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(req.user?.id || "User", "Chat", "POST /", error);
    logger.error(req.user?.id || "User", "Chat", "POST /", error);
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

router.post("/:chatId/messages", async (req, res) => {
  try {
    const { chatId } = req.params;
    const { sender, receiver, message } = req.body;
    console.log(req.body)
    const chatExist = await Chat.findById(chatId);
    if (!chatExist) {
      return res.status(404).json({ message: "Sohbet Bulunamadı!" });
    }
    // chat.messages.push({ sender, receiver, message });

    // await chat.save();

    const chat = await Chat.findOneAndUpdate(
        { _id: chatId },
        {
          $push: {
            messages: {  sender, receiver, message },
          },
        },
        { new: true }
      );

    return res.status(_enum.HTTP_CODES.CREATED).json(
      Response.successResponse({
        success: true,
        chat: chat,
      })
    );
  } catch (error) {
    console.log(error);
    auditLogs.error(
      req.user?.id || "User",
      "Chat",
      "POST /:chatId/messages",
      error
    );
    logger.error(
      req.user?.id || "User",
      "Chat",
      "POST /:chatId/messages",
      error
    );
    res
      .status(_enum.HTTP_CODES.INT_SERVER_ERROR)
      .json(Response.errorResponse(error));
  }
});

module.exports = router;
