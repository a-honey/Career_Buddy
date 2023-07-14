import { Schema, model } from "mongoose";

// 학력정보 document들이 저장되는 'educations' collection의 스키마를 정의합니다.
const EducationSchema = new Schema(
  {
    userId: {
      /*
      type: Schema.Types.ObjectId,
      ref: 'User',
      */
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
    },
    major: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    entryDate: {
      type: String,
      required: true,
    },
    gradDate: {  
      type: String,
      required: false,
    },
    grade: {
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    sortOrder:{
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };