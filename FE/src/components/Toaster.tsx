import { useMemo, type FC } from 'react';

import { usePopups, useToaster } from '../hooks';
import { Toast } from './Toast';

import './Toaster.css';

export const Toaster: FC = () => {
  const { toasts, removeToast } = useToaster();
  const { addPopup } = usePopups();
  const lastNth = toasts.length < 4 ? toasts.length : 4;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lastFour = useMemo(() => toasts.slice(0, 5), [toasts.at(0), lastNth]);

  return (
    <div className="toaster">
      {lastFour.map((toast, i) => (
        <Toast
          key={toast.id}
          isActive={!i}
          isVisible={i < 3}
          closeToast={removeToast}
          openPopup={addPopup}
          {...toast}
        />
      ))}
    </div>
  );
};
