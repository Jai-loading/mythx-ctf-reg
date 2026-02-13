import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch?: string;
  rollno?: string;
  othercollege?: string;
}

const formDataSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      trim: true,
    },
    rollno: {
      type: String,
      trim: true,
    },
    othercollege: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", formDataSchema);

export default User;
