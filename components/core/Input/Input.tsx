import { InputProps } from "@/types";
import React from "react";

const Input: React.FC<InputProps> = ({
  label,
  name,
  onChange,
  value,
  required,
  type = "text",
}) => {
  return (
    <div>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id="title"
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        aria-required="true"
      />
    </div>
  );
};

export default Input;
