"use client";

import Image from "next/image";
import React from "react";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({ userId, type }: Props) => {
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex gap-1.5">
          <Image
            height={18}
            width={18}
            alt="upvote"
            src="/assets/icons/upvote.svg"
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className=" subtle-medium text-dark400_light900 ">12</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Image
            height={18}
            width={18}
            alt="downvote"
            src="/assets/icons/downvote.svg"
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className=" subtle-medium text-dark400_light900 ">12</p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          height={18}
          width={18}
          alt="favorite"
          src="/assets/icons/star-red.svg"
        />
      )}
    </div>
  );
};

export default Votes;
