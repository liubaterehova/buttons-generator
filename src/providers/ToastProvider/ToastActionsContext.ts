import { createContext } from 'react';
import { ToastType } from '../../components/Toast/Toast';

export interface IShowToastData {
  type?: ToastType;
  message: string;
}

export interface IToastProviderActions {
  showToast: (data: IShowToastData) => void;
}

export const ToastActionsContext = createContext<IToastProviderActions>({
  showToast: () => undefined,
});
