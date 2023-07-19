import { Schema, model } from "mongoose";
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

// 게시판 document들이 저장되는 'textboards' collection의 스키마를 정의합니다.
const TextboardSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdTime: {
      type: String,
      required: true,
    },
    modifiedTime: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose-sequence 플러그인이 index 필드를 자체적으로 생성해서 auto-increment를 수행합니다.
TextboardSchema.plugin(AutoIncrement, { inc_field: 'index' });

const TextboardModel = model("Textboard", TextboardSchema);

export { TextboardModel };