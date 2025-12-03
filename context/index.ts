import { AuthContextType, TaskContextType } from "@/types";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextType| null>(null);
export const TaskContext = createContext<TaskContextType | null>(null);
