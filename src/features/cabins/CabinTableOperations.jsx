import React from "react";
import Filter from "../../UI/Filter";
import Sort from "../../UI/Sort";

function CabinTableOperations() {
  return (
    <>
      <Filter
        filterField={"Discount"}
        options={[
          { value: "All", label: "All" },
          { value: "No-discount", label: "No-discount" },
          { value: "With-discount", label: "With-discount" },
        ]}
      />
      <Sort
        filterField={"SortBy"}
        options={[
          {
            value: "name-asc",
            label: "Sort by name (A-Z)",
          },

          {
            value: "name-disc",
            label: "Sort by name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by price (low frist)",
          },
          {
            value: "regularPrice-disc",
            label: "Sort by price (high frist)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity (low frist)",
          },
          {
            value: "maxCapacity-disc",
            label: "Sort by capacity (high frist)",
          },
        ]}
      />
    </>
  );
}

export default CabinTableOperations;
