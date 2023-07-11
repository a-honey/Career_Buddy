import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
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
