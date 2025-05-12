import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  picture: string;
  password: string;
  studentId: string;
  // role: string; // "admin" | "user"
  refreshToken: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    picture: { type: String, default: "" },
    password: { type: String, required: true },
    studentId: { type: String },
    refreshToken: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
