import { Box } from 'components/Box';
import React from 'react';
import { Header } from 'web/components/Header';

export function CardsPage() {
  return (
    <Box flex={1}>
      <Header title="Платежная информация" showBackButton showProfileButton={false} />
      <Box flex={1} marginLeft={16} marginRight={16}></Box>
    </Box>
  );
}
