import styles from './styles.module.css';
import { Box } from 'components/Box';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Notification } from 'web/components/NotificationManager/Notification';

export type NotificationOptions = {
  content: React.ReactNode;
};

let infoFunction: (options: NotificationOptions) => void;

export function NotificationManager({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<{ id: number; options: NotificationOptions }[]>([]);

  const showNotification = useCallback((options: NotificationOptions) => {
    setNotifications((prevState) => [...prevState, { options, id: Date.now() }]);
  }, []);

  useEffect(() => {
    infoFunction = showNotification;
  }, [showNotification]);

  function handleDelete(id: number) {
    setNotifications((prevState) => prevState.filter((_) => _.id !== id));
  }

  return (
    <>
      <Box className={styles.container} paddingLeft={16} paddingRight={16}>
        {notifications.map((item) => (
          <Notification onDelete={handleDelete} key={item?.id} item={item?.options} id={item?.id} />
        ))}
      </Box>
      {children}
    </>
  );
}

export function notification(options: NotificationOptions) {
  return infoFunction?.(options);
}
