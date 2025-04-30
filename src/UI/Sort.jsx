import React from "react";
import { useSearchParams } from "react-router-dom";
import Selected from "./Selected";

function Sort({ options, filterField }) {
  const [SearchParams, setSearchParams] = useSearchParams();
  const SortBy = SearchParams.get(filterField) || "";

  const handelSelectChange = (e) => {
    SearchParams.set(filterField, e.target.value);
    setSearchParams(SearchParams);
  };

  return (

      <Selected
        options={options}
        onChange={handelSelectChange}
        value={SortBy}
      />
 
  );
}

export default Sort;
