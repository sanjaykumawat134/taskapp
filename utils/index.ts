import { StatusType, Task } from "@/types";
import { DUMMY_DESCRIPTION } from "./constant";

export const enhanceTasks = (
  todos: { id: number; title: string; completed: boolean }[]
): Task[] => {
  const statuses: StatusType[] = ["Pending", "In Progress", "Completed"];
  return todos.map((todo, index) => {
    const status: StatusType = todo.completed
      ? "Completed"
      : index % 3 === 0
      ? "Pending"
      : "In Progress";

    const id = String(todo.id || crypto.randomUUID());

    return {
      id: id,
      title: todo.title,
      description: DUMMY_DESCRIPTION,
      status: status,
      dueDate: generateRandomDueDate(),
      completed: status === "Completed",
    };
  });
};

export const generateRandomDueDate = (): string => {
  const future = new Date();
  const days = Math.floor(Math.random() * 30) + 1;
  future.setDate(future.getDate() + days);
  return future.toISOString().split("T")[0];
};

 export const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };