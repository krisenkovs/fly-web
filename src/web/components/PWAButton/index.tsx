import { Box, TouchableOpacity, Typography } from 'components';
import { COLORS } from 'constant';
import { ApplicationIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { store } from 'web/application/store';

export const PWAButton = observer(() => {
  const { promptInstall } = store;

  function handleClick(evt: any) {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  }

  return (
    <TouchableOpacity onPress={handleClick}>
      <Box
        backgroundColor={COLORS.LIGHT_BLUE}
        borderRadius={8}
        alignItems="center"
        justifyContent="center"
        paddingTop={10}
        paddingBottom={10}
      >
        <Box flexDirection="row">
          <ApplicationIcon />
          <Box marginLeft={8}>
            <Typography color={COLORS.BLUE} size={16} lineHeight={24} weight={600}>
              Установить приложение
            </Typography>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
});
