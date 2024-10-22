import React, { PropsWithChildren, useEffect, useState } from 'react';

export type ToastType = 'error';

interface IToastProps {
  type?: ToastType;
  onClose: () => void;
}

const TYPE_TO_STYLES: Record<ToastType, string> = {
  error: 'bg-red-500',
};

const typeToStyles = (type: ToastType) => {
  return TYPE_TO_STYLES[type] ?? '';
};

export const Toast = ({
  type = 'error',
  onClose,
  children,
}: PropsWithChildren<IToastProps>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timerId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timerId);
  }, [setIsVisible]);

  const positionClasses = isVisible
    ? 'top-2 translate-y-0'
    : 'top-0 -translate-y-full';

  return (
    <div
      style={{ transition: 'all 0.3s ease-in-out' }}
      className={`${typeToStyles(type)} absolute right-1/2 translate-x-1/2 ${positionClasses} text-white font-bold py-2 px-4 rounded`}
      onTransitionEnd={() => {
        if (!isVisible) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
};
