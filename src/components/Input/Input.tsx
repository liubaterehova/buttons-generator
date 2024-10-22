import React from 'react';
import classnames from 'classnames';

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  className,
  ...restProps
}: IInputProps) => {
  return (
    <input
      id={id}
      className={classnames(
        'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-2 px-3',
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...restProps}
    />
  );
};
