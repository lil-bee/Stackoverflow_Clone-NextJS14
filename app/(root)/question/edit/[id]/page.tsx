import { Question } from "@/components/shared/form/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });
  console.log("RESULT ", result);
  console.log("MONGOUSE ", mongoUser);
  return (
    <Question
      type="Edit" // NOTE:  kudu uppercase?
      mongoUserId={JSON.stringify(mongoUser._id)}
      questionDetail={JSON.stringify(result)}
    />
  );
};

export default page;
