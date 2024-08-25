"use client";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const handleNavigation = (type: string) => {
    const nextPageNumber = type === "prev" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery({
      params: searchParam.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;
  return (
    <>
      <div className="mt-10 flex w-full items-center justify-center gap-2">
        <Button
          disabled={pageNumber === 1}
          onClick={() => handleNavigation("prev")}
          className="btn shadow-light100_dark100 light-border-2 border px-4 py-2"
        >
          <p className="body-medium text-dark200_light800">Prev</p>
        </Button>
        <div className="text-dark400_light900 flex items-center justify-center rounded-lg bg-primary-500 px-3.5 py-2">
          <p className="body-semibold text-light-900">{pageNumber}</p>
        </div>
        <Button
          disabled={!isNext}
          onClick={() => handleNavigation("next")}
          className="btn text-dark300_light900 shadow-light100_dark100 light-border-2 border px-4 py-2"
        >
          <p className="body-medium text-dark200_light800">Next</p>
        </Button>
      </div>
    </>
  );
};

export default Pagination;
