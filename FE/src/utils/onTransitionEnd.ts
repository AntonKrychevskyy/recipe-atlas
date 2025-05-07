export const onTransitionEnd = (
  element: HTMLElement,
  callback: (e?: Event) => void,
  timeout: number = 0
) => {
  if (!element) return;

  const transitionEndEvents = [
    'transitionend',
    'webkitTransitionEnd',
    'oTransitionEnd',
    'MSTransitionEnd',
  ];

  if (timeout) {
    setTimeout(() => {
      transitionEndEvents.forEach((eventName) =>
        element.addEventListener(eventName, callback)
      );
    }, timeout);
  } else {
    transitionEndEvents.forEach((eventName) =>
      element.addEventListener(eventName, callback)
    );
  }

  return () => {
    transitionEndEvents.forEach((eventName) =>
      element.removeEventListener(eventName, callback)
    );
  };
};
