"use client";
import { Loader } from "@/components/core/icons";
import Input from "@/components/core/Input/Input";
import { useAuthContext } from "@/hooks/useAuthContext";
import { TaskFormProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login({ navigate }: Pick<TaskFormProps, "navigate">) {
  const { login } = useAuthContext();
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!username || !password) {
      setError("Both fields are required.");
      setIsLoading(false);
      return;
    }

    const result = await login(username, password);
    setIsLoading(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error ?? "Unknown authentication error.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to TaskFlow Pro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-100 p-3 text-sm text-red-600 border border-red-300">
              {error}
            </div>
          )}
          <div></div>
          <Input
            required
            label="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Input
              label="password"
              required
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
          >
            {isLoading ? <Loader /> : "Sign In"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Use: **test** / **password**
          </p>
        </form>
      </div>
    </div>
  );
}
