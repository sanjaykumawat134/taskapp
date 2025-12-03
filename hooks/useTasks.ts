import { StatusType, Task, TaskContextType } from "@/types";
import { API_BASE_URL } from "@/utils/constant";
import { enhanceTasks } from "@/utils/index";
import { useCallback, useEffect, useState } from "react";

export const useTasks = (): TaskContextType => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/todos?_limit=20`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks.');
      }
      const data: { id: number; title: string; completed: boolean }[] = await response.json();
      const enhancedTasks = enhanceTasks(data);
      setTasks(enhancedTasks);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>): string => {    
    const status: StatusType = newTask.status as StatusType;
    const taskWithId: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      status,
      completed: status === 'Completed',
    };
    setTasks(prevTasks => [...prevTasks, taskWithId]);
    return taskWithId.id;
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const toggleComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          const newStatus: StatusType = newCompleted ? 'Completed' : 'Pending';
          return {
            ...task,
            completed: newCompleted,
            status: newStatus,
          };
        }
        return task;
      })
    );
  };

  const getTaskById = (id: string) => tasks.find(task => String(task.id) === String(id));

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    toggleComplete,
    getTaskById,
  };
};
