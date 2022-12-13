import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { ChatCircleDots } from 'icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export function HelpPage() {
  const { replace } = useHistory();
  function handlePress() {
    window.location.href = 'mailto:support@batteryfly.io';
  }

  function handleBackClick() {
    replace(ROUTES.PROFILE);
  }

  return (
    <Box flex={1}>
      <Header title="Помощь" showBackButton showProfileButton={false} onBackClick={handleBackClick} />
      <Box flex={1} marginLeft={16} marginRight={16}>
        <Box flex={1} />
        <ChatCircleDots />
        <Box marginTop={32}>
          <Typography color={COLORS.BLACK} weight={400} size={16} lineHeight={24}>
            По всем вопросам касательно работы приложения можно обращаться в службу поддержки
          </Typography>
        </Box>
        <Box marginTop={20}>
          <TouchableOpacity onPress={handlePress}>
            <Typography color={COLORS.BLUE} weight={700} size={18} lineHeight={24}>
              support@batteryfly.io
            </Typography>
          </TouchableOpacity>
        </Box>
        <Box flex={1} />
      </Box>
    </Box>
  );
}
