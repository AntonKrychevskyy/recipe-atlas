export const onClose = (element: HTMLDialogElement, callback: () => void) => {
  if (!element) return;

  element.addEventListener('close', callback);

  return () => element && element.removeEventListener('close', callback);
};
