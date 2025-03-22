import React from 'react';
import { useField } from 'formik';

const InputField = ({ label, type, name, ...props }) => {
  const [field, meta] = useField(name); // Formik hook to handle form fields

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...field} // Spread the field props from Formik (name, value, onChange, onBlur)
        {...props} // Spread any other props (like placeholder, type, etc.)
        className="mt-1 p-2 border bg-blue-50 border-gray-300 rounded-md w-full"
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
