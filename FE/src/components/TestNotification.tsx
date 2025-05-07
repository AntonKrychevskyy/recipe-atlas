import { useState } from 'react';
import { useToaster } from '../hooks';
import { NotificationType } from '../constants';

export const TestNotification = () => {
  const [count, setCount] = useState(1);
  const { addToast } = useToaster();
  const sendNotification = (type: 'info' | 'warning' | 'error') => () => {
    addToast({
      type: NotificationType[type],
      title: `Message #${count}`,
      summary:
        "Something happend in the world again! Be careful, follow up to be notified about other upcomming events. Don't hazitate, subscribe quickly. Lorem ipsum, dolor me adfjad;jf adfadkfjaldjkfasdkf adaf akd",
      details: [
        `Important, important! Something happend somewhere in the world. Again! (${count})`,
        'Take care, proceed to info detox bunker to avoid any harmful effect on your tender psychological state.',
      ],
      // timeout: 1e4,
      duration: 0,
    });

    setCount((c) => c + 1);
  };

  return (
    <>
      <button onClick={sendNotification('info')}>Send Info</button>;
      <button onClick={sendNotification('warning')}>Send Warning</button>;
      <button onClick={sendNotification('error')}>Send Error</button>;
    </>
  );
};
