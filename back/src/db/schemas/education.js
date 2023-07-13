import { Schema, model } from "mongoose";

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
