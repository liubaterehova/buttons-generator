import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Toast } from '../../components/Toast';
import { IShowToastData, ToastActionsContext } from './ToastActionsContext';

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastData, setToastData] = useState<IShowToastData | null>(null);

  const showToast = useCallback(
    (data: IShowToastData) => {
      setToastData(data);
    },
    [setToastData],
  );

  return (
    <ToastActionsContext.Provider value={{ showToast }}>
      {toastData && (
        <Toast type={toastData.type} onClose={() => setToastData(null)}>
          {toastData.message}
        </Toast>
      )}
      {children}
    </ToastActionsContext.Provider>
  );
};
