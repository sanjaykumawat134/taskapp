import Button from "@/components/core/Button/Button";
import Input from "@/components/core/Input/Input";
import TextArea from "@/components/core/Input/TextArea";
import Select from "@/components/core/Select/Select";
import { useTaskContext } from "@/hooks/useTaskContext";
import { StatusType, Task, TaskFormProps } from "@/types";
import { generateRandomDueDate } from "@/utils";
import { useState } from "react";

const TaskForm: React.FC<TaskFormProps> = ({ navigate, taskId }) => {
  const { getTaskById, addTask, updateTask } = useTaskContext();
  const isEditing = !!taskId;
  const existingTask = isEditing ? getTaskById(taskId) : undefined;

  const [formData, setFormData] = useState<Omit<Task, "id" | "completed">>({
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    status: (existingTask?.status || "Pending") as StatusType,
    dueDate: existingTask?.dueDate || generateRandomDueDate(),
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.dueDate
    ) {
      setError("Title, Description, and Due Date are required.");
      return;
    }

    if (isEditing && existingTask) {
      const updatedTask: Task = {
        ...existingTask,
        ...formData,
        status: formData.status,
        completed: formData.status === "Completed",
      };
      updateTask(updatedTask);
    } else {
      addTask(formData);
    }
    navigate("list");
  };

  if (existingTask && existingTask.completed && isEditing) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {existingTask.title}
        </h2>
        <div className="rounded-xl p-6 bg-yellow-50 border border-yellow-200 text-yellow-800">
          <p className="font-semibold mb-2">Task Completed</p>
          <p>This task is marked as completed and can no longer be edited.</p>
        </div>
        <Button
          onClick={() => navigate("list")}
          btnClass="mt-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back to List
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? "Edit Task" : "Add New Task"}
      </h2>
      <div className="rounded-xl bg-white shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-300">
              {error}
            </div>
          )}
          <Input
            label="title"
            name="title"
            required
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
          <TextArea
            label="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            aria-required="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              name="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
            <Select value={formData.status} onChange={handleChange} />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => {
                navigate("list");
              }}
              label="Cancel"
              type="button"
            />

            <Button
              onClick={() => {
                // navigate("list");
              }}
              label={isEditing ? "Save Changes" : "Create Task"}
              type="submit"
              btnClass="inline-flex items-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-150"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
