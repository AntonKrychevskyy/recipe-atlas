import { useEffect, useMemo, useRef, type FC } from 'react';

import { IPopup } from '../types';
import './Popup.css';
import { NotificationTypeSign } from '../constants';
import { onClose, onTransitionEnd } from '../utils';

interface Props extends Partial<IPopup> {
  closePopup: () => void;
}

export const Popup: FC<Props> = ({
  id,
  type,
  title,
  summary,
  details,
  trace,
  closePopup,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const message = useMemo(
    () => (typeof details === 'string' ? details.split('\r\n') : details),
    [details]
  );
  useEffect(() => {
    if (!id || !dialogRef.current) return;

    const ua = navigator.userAgent;
    const isAllowDiscreteSupported =
      !ua.includes('Firefox') &&
      !ua.includes('MSIE') &&
      !ua.includes('Trident') &&
      !ua.includes('rv:11') &&
      CSS.supports('transition-behavior', 'allow-discrete');

    let cleanUp;

    if (isAllowDiscreteSupported) {
      cleanUp = onTransitionEnd(dialogRef.current, closePopup, 1000);
    } else {
      cleanUp = onClose(dialogRef.current, closePopup);
    }

    return cleanUp;
  }, [dialogRef, id, closePopup]);

  return (
    <dialog className="popup" id="popup" ref={dialogRef}>
      {!!id && (
        <>
          <header className={`popup__header popup__header--${type?.toLowerCase()}`}>
            <h5 className="popup__heading">
              <span className="popup__sign">{NotificationTypeSign[type!]}</span>
              {title}
            </h5>
            <form method="dialog" className="popup__close-form">
              <button type="submit" className="popup__close">
                ❌
              </button>
            </form>
          </header>
          <section className="popup__content">
            <p className="popup__summary">
              {type!.at(0)}
              {type!.slice(1).toLowerCase()}: {summary}
            </p>
            {message && message.map((p, i) => <p key={i}>{p}</p>)}
            {trace && (
              <pre className="popup__trace">
                <code>{trace}</code>
              </pre>
            )}
          </section>
        </>
      )}
    </dialog>
  );
};
