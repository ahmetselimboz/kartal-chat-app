import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  _id:string;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  bioDesc: string;
  emailConfirmed: boolean;
}

const userSchema = new Schema<IUser>({
  _id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: { type: String, default: "https://image.ahmetselimboz.com.tr/kartal-chat-app/Default/user.png" },
  bioDesc: { type: String, default: "#" },
  emailConfirmed: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
