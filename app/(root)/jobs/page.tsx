import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import NoResult from "@/components/shared/NoResult";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import { getCountryList, getJob } from "@/lib/actions/job.action";
import JobCard from "@/components/shared/card/JobCard";
import FilterJob from "@/components/shared/FilterJob";

export const metadata: Metadata = {
  title: "Jobs",
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const countryFilters = await getCountryList();
  const arrCountry = [
    // @ts-ignore
    ...new Set(
      countryFilters?.result.map((country: any) => country.name.common)
    ),
  ].map((countryName) => ({
    name: countryName,
    value: countryName,
  }));

  const jobResult = await getJob({
    query: searchParams.q,
    filter: searchParams.filter,
  });

  if (!jobResult?.jobData) {
    return (
      <NoResult
        title="Job Search Unavailable"
        description="Our job search service is currently unavailable. 🚧 We're working hard to get it back online. Please check back later, or explore other features in the meantime. Thank you for your patience!"
        link="/"
        linkTitle="Back to Home"
      />
    );
  }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h2-bold text-dark100_light900">Jobs</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/jobs"
          placeholder="Job Title, Company or Keywords"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <FilterJob
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          filters={arrCountry}
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {jobResult?.jobData?.length > 0 ? (
          jobResult?.jobData?.map((job: any) => (
            <JobCard key={job.job_id} job={job} />
          ))
        ) : (
          <NoResult
            title="There’s no job to show"
            description="It looks like there are no jobs matching your criteria right now. 🚀 Stay tuned, and keep checking back for new opportunities! In the meantime, feel free to explore other features."
            link="/jobs"
            linkTitle="Find Another Jobs"
          />
        )}
      </div>
    </>
  );
}
