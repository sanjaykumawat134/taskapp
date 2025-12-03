import { TextAreaProps } from '@/types';
import React from 'react'

const TextArea: React.FC<TextAreaProps> = ({ label, name, onChange, value }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={3}
        required
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        aria-required="true"
      ></textarea>
    </div>
  );
}
export default TextArea;
