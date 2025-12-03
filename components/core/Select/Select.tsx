import { StatusSelectProps } from "@/types";

const Select: React.FC<StatusSelectProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div>
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-700"
      >
        Status
      </label>
      <select
        id="status"
        name="status"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white disabled:bg-gray-100 disabled:text-gray-500"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default Select;