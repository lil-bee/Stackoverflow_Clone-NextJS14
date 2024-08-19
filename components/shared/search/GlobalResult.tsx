import React from "react";
import GlobalSearchFilter from "../GlobalSearchFilter";

const GlobalResult = () => {
  return (
    <div className="background-light800_dark400 absolute mt-2 w-full rounded-xl px-4 py-2">
      <div className="flex w-full items-center justify-start gap-6 py-5">
        <p className="base-semibold">Type : </p>
        <GlobalSearchFilter />
      </div>
      GlobalResult
    </div>
  );
};

export default GlobalResult;
