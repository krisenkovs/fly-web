import { NotificationOptions } from './index';
import { TouchableOpacity, Typography } from 'components';
import { Box } from 'components/Box';
import { COLORS } from 'constant';
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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  function handleDelete() {
    onDelete(id);
  }

  return (
    <Box
      backgroundColor={COLORS.BG_RED}
      paddingLeft={16}
      paddingRight={16}
      paddingBottom={16}
      paddingTop={16}
      borderRadius={12}
    >
      <Typography color={COLORS.BLACK} size={14} lineHeight={20} weight={400} textAlign="center">
        {item?.content}
      </Typography>
      <Box marginTop={8}>
        <TouchableOpacity onPress={handleDelete}>
          <Box
            backgroundColor={COLORS.WHITE}
            borderRadius={8}
            paddingTop={4}
            paddingBottom={4}
            alignItems="center"
            justifyContent="center"
          >
            <Typography color={COLORS.RED} size={14} lineHeight={20} weight={500}>
              Ok
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
