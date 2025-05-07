import { useEffect, useReducer, type JSX, type ActionDispatch } from 'react';
import type { IToast, ToastConfig, ToasterAction } from '../types';
import { ToastActionType } from '../constants';
import { ToasterContext } from './ToasterContext';

const toasterRecuder = (state: IToast[], action: ToasterAction): IToast[] => {
  switch (action.type) {
    case ToastActionType.add:
      return [...state, action.payload];
    case ToastActionType.remove:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

let toastDispatch: ActionDispatch<[action: ToasterAction]> | null;
const setToastDispatch = (dispatch: ActionDispatch<[action: ToasterAction]> | null) => {
  toastDispatch = dispatch;
};

const addToast = (toastConfig: ToastConfig) => {
  if (toastDispatch) {
    const id = Date.now();
    toastDispatch({
      type: ToastActionType.add,
      payload: { duration: 1e4, ...toastConfig, id },
    });
  } else {
    console.error('Toast dispatch not set. Is ToasterProvider mounter?');
  }
};

const removeToast = (id: number) => {
  if (toastDispatch) {
    toastDispatch({ type: ToastActionType.remove, payload: id });
  }
};

export const ToasterProvider = ({ children }: { children: JSX.Element }) => {
  const [toasts, dispatch] = useReducer(toasterRecuder, []);

  useEffect(() => {
    setToastDispatch(dispatch);

    return () => setToastDispatch(null);
  }, [dispatch]);

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToasterContext.Provider>
  );
};
