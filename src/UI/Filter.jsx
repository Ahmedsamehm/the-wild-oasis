import React from "react";
import { useSearchParams } from "react-router-dom";
import LinksGroups from "./LinksGroups";
import Sort from "./Sort";

function Filter({ filterField, options }) {
  const [SearchParams, setSearchParams] = useSearchParams();
  const filterValue = SearchParams.get(filterField) || "";

  const handelClick = (value) => {
    SearchParams.set(filterField, value);
    setSearchParams(SearchParams);
  };
  // grid grid-cols-2 ${options.length === 4 ? "xl:grid-cols-4" : "md:grid-cols-3"}
  return (
    <>
      <ul
        className={`grid ${options.length === 4 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"} ${options.length === 3 && "md:grid-cols-3"}  w-full text-center gap-2  items-center`}
      >
        {options?.map((option, index) => {
          return (
            <LinksGroups
              key={index}
              isActive={filterValue === option?.value}
              onClick={() => handelClick(option?.value)}
            >
              {option?.label}
            </LinksGroups>
          );
        })}
      </ul>
    </>
  );
}

export default Filter;
