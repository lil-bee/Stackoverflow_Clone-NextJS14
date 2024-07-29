import Link from "next/link";
import React from "react";
import Metric from "../Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface AnswerProps {
  _id: string;
  author: { _id: string; clerkId: string; name: string; picture: string };
  upvotes: string[];
  createdAt: Date;
  question: { _id: string; title: string };
}

const AnswerCard = ({
  author,
  _id,
  upvotes,
  question,
  createdAt,
}: AnswerProps) => {
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] p-9 sm:px-11"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>

          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>
        {/* If signed in add edit delete actions */}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(upvotes.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </Link>
  );
};

export default AnswerCard;
