import React from "react";
import QuestionCard from "./card/QuestionCard";
import { getUserQuestions } from "@/lib/actions/user.action";

interface Props {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ userId, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
