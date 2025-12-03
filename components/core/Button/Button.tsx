import { ButtonProps } from "@/types";
import React, { PropsWithChildren } from "react";

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  type,
  label,
  btnClass,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        btnClass
          ? btnClass
          : "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
      }
    >
      {label} {children}
    </button>
  );
};

export default Button;
