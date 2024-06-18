"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    // connect to db
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create question
    const question = await Question.create({
      title,
      content,
      author,
    });

    // create the tags or get them if they already exist
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path);
  } catch (error) {}
}
