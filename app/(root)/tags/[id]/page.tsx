import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/shared/card/QuestionCard";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { IQuestion } from "@/database/question.model";
import { URLProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = await getQuestionsByTagId({
    tagId: params.id,
  });

  const tagName = capitalizeFirstLetter(result.tagTitle);

  return {
    title: `${tagName} Tag`,
  };
}

export default async function Home({ params, searchParams }: URLProps) {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          {capitalizeFirstLetter(result.tagTitle)}
        </h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          placeholder="Search Questions"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {result.questions.length > 0 ? (
          result.questions.map((question: IQuestion) => (
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
          ))
        ) : (
          <NoResult
            title="There’s no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
