import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { Fly } from 'icons';
import React, { useState } from 'react';
import { Header } from 'web/components/Header';
import { ConditionModal } from 'web/pages/AboutPage/ConditionModal';

export function AboutPage() {
  const [visible, setVisible] = useState(false);

  function handlePress() {
    setVisible(true);
  }
  return (
    <Box flex={1} position="relative">
      <Header title="О приложении" showBackButton showProfileButton={false} />
      <Box flex={1} marginLeft={16} marginRight={16}>
        <Box flex={1} />
        <Fly />
        <Box marginTop={32}>
          <Typography color={COLORS.BLACK} weight={400} size={16} lineHeight={24}>
            Как принято считать, непосредственные участники технического прогресса и по сей день остаются уделом
            либералов, которые жаждут быть ограничены исключительно образом мышления. Как уже неоднократно упомянуто,
            тщательные исследования конкурентов являются только методом политического участия и превращены в посмешище,
            хотя само их существование приносит несомненную пользу обществу. Но повышение уровня гражданского сознания
            не оставляет шанса для прогресса профессионального сообщества.
          </Typography>
        </Box>
        <Box marginTop={32}>
          <TouchableOpacity onPress={handlePress}>
            <Typography color={COLORS.BLUE} weight={400} size={16} lineHeight={24}>
              Политика конфиденциальности
            </Typography>
          </TouchableOpacity>
        </Box>
        <Box flex={1} />
      </Box>
      <ConditionModal visible={visible} onClose={() => setVisible(false)} />
    </Box>
  );
}
