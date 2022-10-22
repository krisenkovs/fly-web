import { ConditionModal } from './ConditionModal';
import { store as conditionModalStore } from './ConditionModal/store';
import styles from './styles.module.css';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { FlyIcon } from 'icons';
import React from 'react';
import { Header } from 'web/components/Header';

export function AboutPage() {
  function handlePress() {
    conditionModalStore.show();
  }
  return (
    <Box flex={1} position="relative">
      <Header title="О приложении" showBackButton showProfileButton={false} />
      <Box flex={1} marginLeft={16} marginRight={16}>
        <Box flex={1} />
        <Box height={100} position="relative" alignItems="center" justifyContent="center">
          <img src="images/waves.png" className={styles.image} alt="" />

          <FlyIcon width={80} height={80} color={COLORS.LIGHT_BLUE} />
        </Box>
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
      <ConditionModal />
    </Box>
  );
}
