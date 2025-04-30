import React from "react";

function Selected({ options, onChange, value }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="select select-success space-x-3  "
    >
      {options.map((option) => (
        <option className="text-[1rem]" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Selected;
