import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    social: {
      type: Object,
      required: false,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    imgBase64:{
      type: String,
      required: false,
    },
    isPasswordReset: {
      type: Boolean,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };