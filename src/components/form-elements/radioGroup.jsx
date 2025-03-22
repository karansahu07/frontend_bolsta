import React from 'react';
import { useField } from 'formik';

const RadioGroup = ({ label, name, options }) => {
  const [field, meta] = useField(name); // Formik hook to handle radio buttons

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center mt-2">
        {options.map((option) => (
          <div className="form-check me-3" key={option.value}>
            <input
              type="radio"
              name={name}
              id={option.value}
              className="form-check-input"
              value={option.value}
              checked={field.value === option.value}
              {...field} // Spread field props from Formik
            />
            <label className="form-check-label ms-1">{option.label}</label>
          </div>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default RadioGroup;
