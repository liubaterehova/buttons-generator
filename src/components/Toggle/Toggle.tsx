import React from 'react';
import classnames from 'classnames';

interface IToggleProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  label: string;
  className?: string;
  onChange?: (checked: boolean) => void;
}

export const Toggle = ({
  label,
  className,
  onChange,
  ...restProps
}: IToggleProps) => {
  return (
    <label
      className={classnames(
        'inline-flex items-center cursor-pointer',
        className,
      )}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={(e) => onChange?.(e.target.checked)}
        {...restProps}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900">{label}</span>
    </label>
  );
};
