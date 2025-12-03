"use client";
import { useTaskContext } from "@/hooks/useTaskContext";
import { RouteState, StatusType, Task, TaskListPageProps } from "@/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useAuthContext } from "@/hooks/useAuthContext";

const TaskListPage: React.FC<TaskListPageProps> = () => {
  const { loading, error } = useTaskContext();

  const router = useRouter();
  const [route, setRoute] = useState<RouteState>({
    path: "list",
    taskId: null,
  });
  const { isAuthenticated, isAuthLoading } = useAuthContext();

  const navigate = (path: RouteState["path"], id: string | null = null) => {
    setRoute({ path, taskId: id });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xl text-indigo-600">
        Fetching tasks from API...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }
  const renderContent = () => {
    if (isAuthLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center text-lg text-gray-600">
          Initializing application...
        </div>
      );
    }

    const { path, taskId } = route;
    if (!isAuthenticated) {
      return router.push("/login");
    }
    switch (path) {
      case "add":
      case "edit":
        return <TaskForm navigate={navigate} taskId={taskId} />;
      case "list":
      default:
        return <TaskList navigate={navigate} />;
    }
  };

  return <>{renderContent()}</>;
};
export default TaskListPage;
