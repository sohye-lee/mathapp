import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormItemProps {
  label?: string;
  required: boolean | string;
  name: string;
  placeholder?: string;
  formType: 'input' | 'textarea';
  type: 'text' | 'number' | 'email' | 'password';
  register?: any;
  errors?: string;
  [key: string]: any;
}

export default function FormItem({
  label,
  required = false,
  name,
  placeholder,
  formType,
  type,
  register,
  errors,
  ...rest
}: FormItemProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm uppercase tracking-wide">
        {label} {required && <span className="text-red-500 text-xs">*</span>}
      </label>
      {formType == 'input' ? (
        <input
          {...rest}
          {...register(name, { required })}
          type={type}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          {...rest}
          {...register(name, { required })}
          type={type}
          placeholder={placeholder}
        ></textarea>
      )}
      {errors && <p className="text-red-500 text-[12px]">{errors}</p>}
    </div>
  );
}
