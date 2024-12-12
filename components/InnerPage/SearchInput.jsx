import { Input } from "antd";
import React from "react";
import { IoSearchCircle } from "react-icons/io5";

function SearchInput({ setFilters }) {
  return (
    <Input
      onBlur={() => {
        setFilters((oldValues) => ({
          ...oldValues,
          onChangeSearch: false,
        }));
      }}
      placeholder="Search..."
      className="border-2 border-[#3B82F6] focus:outline-none rounded-sm w-[300px]"
      prefix={<IoSearchCircle size={30} color="#3B82F6" className="me-2" />}
      onChange={(event) => {
        const value = event?.target?.value;
        // if values has - then remove it from value (For Number search)
        if (value.includes("-")) {
          const newValue = value.replace(/-/g, "");
          setFilters((oldValues) => ({
            ...oldValues,
            search: newValue.trim(),
            onChangeSearch: true,
          }));
          return;
        }
        setFilters((oldValues) => ({
          ...oldValues,
          search: value.trim(),
          onChangeSearch: true,
        }));
      }}
    />
  );
}

export default SearchInput;
