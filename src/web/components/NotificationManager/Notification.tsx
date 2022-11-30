import { NotificationOptions } from './index';
import styles from './styles.module.css';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { COLORS } from 'constant';
import { CrossIcon } from 'icons';
import React, { useEffect } from 'react';

type Props = {
  onDelete: (id: number) => void;
  item: NotificationOptions;
  id: number;
};

export function Notification({ onDelete, item, id }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDelete(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  function handleDelete() {
    onDelete(id);
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      backgroundColor={COLORS.BG_RED}
      paddingLeft={16}
      paddingRight={16}
      paddingBottom={12}
      paddingTop={12}
      className={styles.item}
      borderRadius={12}
    >
      {item?.content}
    </Box>
  );
}
