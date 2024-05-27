import HomeFilters from "@/components/home/HomeFilters";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import Filter from "@/components/shared/Filter";
import Link from "next/link";
import { HomePageFilters } from "@/constants/filter";
import QuestionCard from "@/components/shared/QuestionCard";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h2-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          placeholder="Search Questions"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          containerClasses="hidden max-md:flex"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          filters={HomePageFilters}
        />
        filter
      </div>
      <HomeFilters />
      <QuestionCard />
    </>
  );
}
