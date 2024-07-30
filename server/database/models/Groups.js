const mongoose = require("mongoose");
const User = require("./Users");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    group_name: { type: String, require: true },
    group_desc: { type: String, require: true, default: "#" },
    group_profile_img: { type: String, require: true,default: "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png"  },
    members: [{ userId: { type: String, ref:User } }],
  },
  { timestamps: true, versionKey: false }
);

const Group = mongoose.model("Groups", groupSchema);
module.exports = Group;
