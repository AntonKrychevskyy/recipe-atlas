export const onAmimationEnd = (
  element: HTMLElement,
  callback: (e?: Event) => void,
  timeout: number = 0
) => {
  if (!element) return;

  const animationEndEvents = [
    'animationend',
    'webkitAnimationEnd',
    'oAnimationEnd',
    'MSAnimationEnd',
  ];

  if (timeout) {
    setTimeout(() => {
      animationEndEvents.forEach((eventName) =>
        element.addEventListener(eventName, callback)
      );
    }, timeout);
  } else {
    animationEndEvents.forEach((eventName) =>
      element.addEventListener(eventName, callback)
    );
  }

  return () => {
    animationEndEvents.forEach((eventName) =>
      element.removeEventListener(eventName, callback)
    );
  };
};
