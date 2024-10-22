import React from 'react';
import { IInputProps, Input } from '../Input';
import classnames from 'classnames';

export interface ILabeledInputProps
  extends Omit<IInputProps, 'className' | 'id'> {
  label: string;
  className?: string;
  inputClassName?: string;
}

export const LabeledInput = ({
  label,
  className,
  inputClassName,
  ...inputProps
}: ILabeledInputProps) => {
  return (
    <div className={classnames('flex items-center gap-y-0', className)}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 w-32"
      >
        {label}
      </label>
      <Input id={label} className={inputClassName} {...inputProps} />
    </div>
  );
};
