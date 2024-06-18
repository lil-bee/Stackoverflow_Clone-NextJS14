import { Schema } from "mongoose";

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId;
  path: string;
}
