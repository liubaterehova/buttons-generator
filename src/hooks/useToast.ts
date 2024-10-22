import { useContext } from 'react';
import { ToastActionsContext } from '../providers/ToastProvider';

export const useToast = () => {
  return useContext(ToastActionsContext);
};
