import { useEffect, useReducer, type JSX, type ActionDispatch } from 'react';
import type { IPopup, NotificationConfig, PopupAction } from '../types';
import { PopupActionType } from '../constants';
import { PopupContext } from './PopupContext';

const popupRecuder = (state: IPopup[], action: PopupAction): IPopup[] => {
  switch (action.type) {
    case PopupActionType.add:
      return [...state, action.payload];
    case PopupActionType.close:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

let popupDispatch: ActionDispatch<[action: PopupAction]> | null;
const setPopupDispatch = (dispatch: ActionDispatch<[action: PopupAction]> | null) => {
  popupDispatch = dispatch;
};

const addPopup = (popupConfig: NotificationConfig) => {
  if (popupDispatch) {
    const id = Date.now();
    popupDispatch({
      type: PopupActionType.add,
      payload: { ...popupConfig, id },
    });
  } else {
    console.error('Popup dispatch not set. Is PopupProvider mounter?');
  }
};

const closePopup = (id: number) => {
  if (popupDispatch) {
    popupDispatch({ type: PopupActionType.close, payload: id });
  }
};

export const PopupProvider = ({ children }: { children: JSX.Element }) => {
  const [popups, dispatch] = useReducer(popupRecuder, []);

  useEffect(() => {
    setPopupDispatch(dispatch);

    return () => setPopupDispatch(null);
  }, [dispatch]);

  return (
    <PopupContext.Provider value={{ popups, addPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};
