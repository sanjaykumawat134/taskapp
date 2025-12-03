import { CheckCircle, Edit } from "@/components/core/icons";
import { useTaskContext } from "@/hooks/useTaskContext";
import {  TaskListItemProps } from "@/types";
import { getStatusColor } from "@/utils";

const TaskListItem: React.FC<TaskListItemProps> = ({ task, navigate }) => {
  const { toggleComplete } = useTaskContext();

  return (
    <div
      className={`p-4 border-b last:border-b-0 flex flex-col md:flex-row justify-between items-start md:items-center transition duration-150 ${
        task.completed ? "opacity-60 bg-gray-50" : "bg-white hover:bg-indigo-50"
      }`}
    >
      <div className="flex-1 min-w-0 pr-4 mb-3 md:mb-0">
        <h3
          className={`text-lg font-semibold ${
            task.completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-500 truncate">{task.description}</p>
      </div>

      <div className="flex items-center space-x-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
        <span className="text-sm font-mono text-gray-600">
          Due: {task.dueDate}
        </span>

        {!task.completed && (
          <button
            onClick={() => navigate("edit", task.id)}
            className="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-100 transition"
            aria-label={`Edit ${task.title}`}
          >
            <Edit className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => toggleComplete(task.id)}
          className={`p-2 rounded-full transition ${
            task.completed
              ? "text-green-600 bg-green-100 hover:bg-green-200"
              : "text-gray-400 hover:text-green-600 hover:bg-green-100"
          }`}
          aria-label={
            task.completed
              ? `Unmark ${task.title}`
              : `Mark ${task.title} as Completed`
          }
        >
          <CheckCircle
            className="w-5 h-5"
            fill={task.completed ? "currentColor" : "none"}
          />
        </button>
      </div>
    </div>
  );
};
export default TaskListItem;
