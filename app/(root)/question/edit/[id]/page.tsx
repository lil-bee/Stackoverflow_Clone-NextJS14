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

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>

      <div className="mt-9">
        <Question
          type="Edit" // NOTE:  kudu uppercase?
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetail={JSON.stringify(result)}
        />
      </div>
    </div>
  );
};

export default page;
