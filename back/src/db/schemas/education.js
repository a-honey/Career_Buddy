import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user_id:{
      type: String,
      required: true,
    },
    item_id:{
      type: String,
      required: true, 
    },
    sort_order:{
      type: Number,
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
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
