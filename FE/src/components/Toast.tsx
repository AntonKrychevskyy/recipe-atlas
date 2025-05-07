import { type FC, useCallback, useEffect, useRef, useState } from 'react';

import { NotificationTypeSign } from '../constants';
import { onAmimationEnd } from '../utils';
import { IToast, NotificationConfig } from '../types';

import './Toast.css';

interface TransitionStyle {
  transitionDuration: string;
}

type Style = TransitionStyle | Record<never, unknown>;

interface Props extends IToast {
  isActive: boolean;
  isVisible: boolean;
  closeToast: (id: number) => void;
  openPopup: (notificationConfig: NotificationConfig) => void;
}

export const Toast: FC<Props> = ({
  id,
  isActive,
  isVisible,
  duration,
  closeToast,
  openPopup,
  ...notification
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setExpanded] = useState(false);
  const [isClosing, setClosing] = useState(0);
  const toggleExpanded = useCallback(() => setExpanded((is) => !is), []);
  const closeFinally = useCallback(() => closeToast(id), [closeToast, id]);
  const popupFinally = useCallback(() => {
    openPopup(notification);
    closeToast(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeToast, openPopup, id]);

  useEffect(() => {
    if (!progressRef.current || !isActive) return;

    return onAmimationEnd(progressRef.current as HTMLElement, () => setClosing(1));
  }, [progressRef, isActive]);

  useEffect(() => {
    if (!toastRef.current || !isClosing) return;

    const closeCallback = isClosing === 1 ? closeFinally : popupFinally;
    return onAmimationEnd(toastRef.current as HTMLElement, closeCallback);
  }, [isClosing, closeFinally, popupFinally]);

  const { type, title, summary } = notification;

  const className =
    'toast' +
    (isActive ? ' toast--active' : '') +
    (isVisible ? ' toast--visible' : '') +
    (isClosing ? ' toast--closing' : '');
  const style: Style = duration ? { animationDuration: duration / 1000 + 's' } : {};

  return (
    <div className={className} ref={toastRef}>
      <article
        className={`toast__content${isExpanded ? ' toast__content--expanded' : ''}`}
      >
        {isActive && !!duration && (
          <div className="toast__progress-bar">
            <div className="toast__progress" ref={progressRef} style={style}></div>
          </div>
        )}
        <header className="toast__header">
          <h6 className="toast__title">
            {NotificationTypeSign[type]} {title}
          </h6>
          <button className="toast__more" onClick={() => setClosing(2)}>
            ⇱
          </button>
          <button className="toast__close" onClick={() => setClosing(1)}>
            ❌
          </button>
        </header>
        <section className="toast__summary">
          <p>
            {type.at(0)}
            {type.slice(1).toLowerCase()}
            {': '}
            {summary}
          </p>
          <button className="toast__expander" onClick={toggleExpanded}>
            {isExpanded ? '🔺' : '🔻'}
          </button>
        </section>
      </article>
    </div>
  );
};
