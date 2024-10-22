import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

interface IFormLayoutProps {
  className?: string;
}

export const FormLayout = ({
  children,
  className,
}: PropsWithChildren<IFormLayoutProps>) => {
  return (
    <div className={classnames('grid gap-y-2', className)}>{children}</div>
  );
};
