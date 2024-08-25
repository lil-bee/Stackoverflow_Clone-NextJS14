"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/filter";
import { useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";

const HomeFilters = () => {
  const router = useTransitionRouter();
  const searchParam = useSearchParams();
  const [active, setActive] = useState(searchParam.get("filter") || "");

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParam.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = formUrlQuery({
        params: searchParam.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400 "
              : "bg-light-800 text-light-500 hover:text-primary-500 dark:bg-dark-300"
          }`}
          key={item.name}
          onClick={() => handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
