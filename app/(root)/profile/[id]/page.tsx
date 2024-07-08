import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ userId: params.id });

  console.log(userInfo);

  return (
    <div>
      {userInfo?.user.name}
      {userInfo?.totalAnswers}
      {userInfo?.totalQuestions}
    </div>
  );
};

export default Page;
