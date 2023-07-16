import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    userId:{
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
      description: {
        type: String,
        default: "설명이 아직 없습니다. 추가해 주세요.",
      }
},  {
  timestamps: true,
}
)
const CertificateModel= model("Certificate", CertificateSchema);

export { CertificateModel };
