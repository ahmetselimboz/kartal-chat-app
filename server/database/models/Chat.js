const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema(
  {
    participants: {
      members: [{
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        memberStatus:{type:Boolean, default:false}
      }],
    },

    messages: { type: [messageSchema], required: true },
  },
  { timestamps: true, versionKey: false }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
