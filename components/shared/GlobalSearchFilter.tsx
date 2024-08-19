"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { GlobalSearchFilters } from "@/constants/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const GlobalSearchFilter = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [active, setActive] = useState(searchParam.get("type") || "");

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
    <div className="hidden flex-wrap gap-3 md:flex">
      {GlobalSearchFilters.map((item) => (
        <Button
          className={`body-medium small-semibold rounded-[40px] px-4 py-2  shadow-none ${
            active === item.value
              ? "bg-primary-500 text-light-900"
              : "bg-light-700 text-dark-500"
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

export default GlobalSearchFilter;
