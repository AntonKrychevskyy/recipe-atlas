import { type FC, useCallback, useEffect } from 'react';

import { Popup } from './Popup';
import { usePopups } from '../hooks';

declare global {
  interface Window {
    popup: {
      showModal: () => void;
    };
  }
}

export const PopupContainer: FC = () => {
  const { popups, closePopup } = usePopups();
  const activePopup = popups.at(0);
  const onClose = useCallback(
    () => activePopup && closePopup(activePopup?.id),
    [activePopup, closePopup]
  );
  useEffect(() => {
    if (!activePopup) return;

    window.popup.showModal();
  }, [activePopup]);

  return <Popup closePopup={onClose} {...activePopup} />;
};
