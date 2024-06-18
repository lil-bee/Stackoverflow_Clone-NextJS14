import { Question } from "@/components/shared/form/Question";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const userId = "CLERK-12345";

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);
  return (
    <div>
      <Question mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default page;
