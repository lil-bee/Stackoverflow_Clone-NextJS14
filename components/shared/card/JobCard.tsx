import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobProps {
  job: {
    _id: string;
    title: string;
    job_title: string;
    employer_logo: string;
    job_city: string;
    job_country: string;
    job_description: string;
    job_employment_type: string;
    job_max_salary?: string;
    job_min_salary?: string;
    job_apply_link: string;
    employer_website: string;
  };
}

const JobCard = ({ job }: JobProps) => {
  return (
    <div className="card-wrapper flex  flex-col  items-start gap-6 rounded-[10px]  p-6 sm:flex-row sm:p-8 sm:px-11">
      <div className="flex w-full justify-end sm:hidden">
        <Badge className="body-medium background-light800_dark400 text-dark400_light700 flex items-center  justify-end  gap-2 rounded-2xl px-3 py-1.5">
          <Image
            alt="country-logo"
            width={16}
            height={16}
            src={`https://flagsapi.com/${job.job_country}/flat/16.png`}
            className="rounded-full object-contain"
          />
          {`${job.job_city}  -  ${job.job_country}`}
        </Badge>
      </div>
      <div className="flex flex-col items-start gap-6 sm:flex-row">
        <Link
          href={job.employer_website ? job.employer_website : ""}
          className="background-light800_dark400 relative size-16 rounded-xl"
        >
          <Image
            alt="employer logo"
            width={64}
            height={64}
            src={
              job.employer_logo
                ? job.employer_logo
                : "/assets/images/site-logo.svg"
            }
            className="size-full object-contain p-2"
          />
        </Link>

        <div className="flex flex-1 flex-col flex-wrap items-start justify-start">
          <div className="flex w-full items-start justify-between">
            <h4 className="base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {job.job_title}
            </h4>
            <Badge className="body-medium background-light800_dark400 text-dark400_light700 hidden items-center  justify-end  gap-2  rounded-2xl px-3 py-1.5 sm:flex">
              <Image
                alt="country-logo"
                width={16}
                height={16}
                src={`https://flagsapi.com/${job.job_country}/flat/16.png`}
                className="rounded-full object-contain"
              />
              {`${job.job_city ? `${job.job_city} - ` : ""} ${job.job_country}`}
            </Badge>
          </div>
          <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
            {job.job_description}
          </p>
          <div className="mt-8 flex w-full  flex-wrap justify-between gap-6">
            <div className="flex  flex-wrap items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Image
                  alt="clock"
                  width={20}
                  height={20}
                  src="/assets/icons/clock-2.svg"
                  className="object-contain"
                />
                <p className="body-medium text-light-500">
                  {job.job_employment_type}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Image
                  alt="dollar"
                  width={20}
                  height={20}
                  src="/assets/icons/currency-dollar-circle.svg"
                />
                {job.job_min_salary && job.job_max_salary ? (
                  <p className="body-medium text-light-500">{`${job.job_min_salary} - ${job.job_max_salary}`}</p>
                ) : (
                  <p className="body-medium text-light-500">Not Disclosed</p>
                )}
              </div>
            </div>

            <Link
              className="body-semibold primary-text-gradient flex items-center gap-2"
              target="_blank"
              href={job.job_apply_link}
            >
              View Job
              <Image
                alt="arrow-link"
                width={16}
                height={16}
                src="/assets/icons/arrow-up-right.svg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
