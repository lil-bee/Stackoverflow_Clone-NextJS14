import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "./card/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ userId, clerkId, searchParams }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          question={item.question}
          author={item.author}
          clerkId={clerkId}
          upvotes={item.upvotes}
          createdAt={item.createdAt}
        />
      ))}
      <Pagination
        isNext={result.isNextAnswer}
        pageNumber={searchParams?.page ? +searchParams.page : 1}
      />
    </>
  );
};

export default AnswerTab;
