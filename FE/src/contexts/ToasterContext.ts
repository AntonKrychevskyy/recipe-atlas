import { createContext } from 'react';
import type { IToasterContext } from '../types';

export const ToasterContext = createContext<IToasterContext>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});
