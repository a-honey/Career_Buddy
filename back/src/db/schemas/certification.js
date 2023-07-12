import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    user_id:{
        type:String,
        ref:'UserModel',
        required:true
    },
    title: {
        type: String,
        required: true,
      },
      issuer: {
        type: String,
        required: true,
      },
      certDate: {
        type: String,
        required: true,
      },
      expDate: {
        type: String,
      },
      certId:{
        type:String,
      },
      description: {
        type: String,
        required: false,
        default: "설명이 아직 없습니다. 추가해 주세요.",
      },
}
)
const CertificateModel= model("Certificate", CertificateSchema);

export { CertificateModel };
