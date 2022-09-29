import { Box } from 'components/Box';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header } from 'web/components/Header';

export const NotificationPage = observer(() => {
  return (
    <Box flex={1}>
      <Header title="Уведомления" showBackButton showProfileButton={false} />
      <Box flex={1} marginLeft={16} marginRight={16}></Box>
    </Box>
  );
});
