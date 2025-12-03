import { useAuthContext } from "@/hooks/useAuthContext";
import React from "react";
import { LogOut } from "../icons";
import Button from "../Button/Button";

export const Header = () => {
  const { isAuthenticated, logout } = useAuthContext();

  if (!isAuthenticated) return null;
  return (
    <header className="sticky top-0 z-10 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div
          className="text-2xl font-extrabold text-indigo-600 cursor-pointer transition hover:text-indigo-700"
          // onClick={() => navigate("list")}
        >
          TaskFlow 
        </div>
        <Button
          onClick={logout}
          btnClass="inline-flex items-center rounded-lg border border-transparent bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 shadow-md hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition duration-150"
        >
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </header>
  );
};
