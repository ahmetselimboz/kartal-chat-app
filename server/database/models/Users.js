const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: {
      type: String,
      default:
        "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png",
    },
    bioDesc: { type: String, default: "#" },
    emailConfirmed: { type: Boolean, default: false },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    notification: [
      {
        slug: { type: String },
        fromId: { type: String },
        fromName: { type: String },
        readed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("Users", userSchema);
module.exports = User;
