"use client";

import React, { useState } from "react";
import { Button } from "../../ui/button";
import { GlobalSearchFilters } from "@/constants/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const GlobalFilter = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  const typeParams = searchParam.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParam.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParam.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type :</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <Button
            className={`light-border-2 small-medium rounded-full px-5 py-0 shadow-none ${
              active === item.value
                ? "bg-primary-500 text-light-900 dark:hover:text-light-900 "
                : "bg-light-700 text-dark-400  hover:text-primary-500 dark:bg-dark-300 dark:text-light-900 dark:hover:hover:text-primary-500 "
            }`}
            key={item.name}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilter;
