import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sortOrder:{
      type: Number,
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
