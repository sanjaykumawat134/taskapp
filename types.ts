export interface RouteState {
  path: "list" | "add" | "edit" | "login";
  taskId: string | null;
}

export interface TaskFormProps {
  navigate: (path: RouteState["path"], id?: string | null) => void;
  taskId: string | null;
}
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthLoading: boolean;
}

export interface TaskListItemProps {
  task: Task;
  navigate: (path: RouteState["path"], id?: string | null) => void;
}

export interface TaskListPageProps {
  navigate: (path: RouteState["path"], id?: string | null) => void;
}

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => void;
  addTask: (newTask: Omit<Task, "id" | "completed">) => string;
  updateTask: (updatedTask: Task) => void;
  toggleComplete: (taskId: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

export type StatusType = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  dueDate: string; // YYYY-MM-DD format
  completed: boolean;
}

export interface RouteState {
  path: "list" | "add" | "edit" | "login";
  taskId: string | null;
}

export interface TaskFormProps {
  navigate: (path: RouteState["path"], id?: string | null) => void;
  taskId: string | null;
}

export interface TaskListItemProps {
  task: Task;
  navigate: (path: RouteState["path"], id?: string | null) => void;
}

export interface TaskListPageProps {
  navigate: (path: RouteState["path"], id?: string | null) => void;
}

export interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: string;
  options?: string[];
  required?: boolean;
}
export interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}


export interface StatusSelectProps {
  value: StatusType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

export interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  btnClass?: string;
  label? : React.ReactNode;
}