import React, { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Search } from "@/components/core/icons";
import { useTaskContext } from "@/hooks/useTaskContext";
import { StatusType, Task, TaskListPageProps } from "@/types";
import TaskListItem from "./TaskListItem";
import Button from "@/components/core/Button/Button";

const TaskList: React.FC<TaskListPageProps> = ({ navigate }) => {
  const { tasks, loading, error, fetchTasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusType | "All">("All");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filtering and Searching
  const filteredTasks = tasks.filter((task: Task) => {
    // Status Filter
    const statusMatch = filterStatus === "All" || task.status === filterStatus;
    // Search Filter
    const searchMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  // Sorting logic based on Due Date and sortDirection
  const sortedTasks = [...filteredTasks].sort((a: Task, b: Task) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    const comparison = dateA.getTime() - dateB.getTime();

    return sortDirection === "asc" ? comparison : comparison * -1;
  });

  // Handler to toggle sort direction
  const handleSortChange = () => {
    setSortDirection((prevDir) => (prevDir === "asc" ? "desc" : "asc"));
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

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Your Task List
        </h1>
        <Button
          onClick={() => navigate("add")}
          label={
            <>
              {" "}
              <Plus className="w-5 h-5 mr-2" /> Add New Task{" "}
            </>
          }
          btnClass="inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        ></Button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="sm:col-span-1 relative">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 pl-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-1">
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as StatusType | "All")
            }
            className="w-full rounded-lg border border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Sort By (Toggable) */}
        <div className="sm:col-span-1">
          <Button
            onClick={handleSortChange}
            btnClass="w-full rounded-lg border border-gray-300 p-2 text-gray-700 bg-white hover:bg-gray-50 flex justify-center items-center focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
          >
            Sort by Due Date
            {sortDirection === "asc" ? (
              <ArrowUp className="w-4 h-4 ml-2" />
            ) : (
              <ArrowDown className="w-4 h-4 ml-2" />
            )}
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task: Task) => (
            <TaskListItem key={task.id} task={task} navigate={navigate} />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No tasks found matching your criteria.
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={fetchTasks}
          btnClass="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition duration-150"
        >
          Refresh Task Data
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
