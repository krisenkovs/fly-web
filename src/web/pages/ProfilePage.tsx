import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { BellIcon, CaretRightIcon, SlidersIcon } from 'icons';
import { observer } from 'mobx-react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

const DATA = [
  {
    id: 'history',
    title: 'История заправок',
  },
  {
    id: 'model',
    title: 'Tesla Model X',
  },
  {
    id: 'payment',
    title: 'Платежная информация',
  },
  {
    id: 'about',
    title: 'О приложении',
  },
  {
    id: 'help',
    title: 'Помощь',
  },
];

export const ProfilePage = observer(() => {
  const { push } = useHistory();

  function handleSettingsClick() {
    push(ROUTES.SETTINGS);
  }

  return (
    <Box flex={1}>
      <Header title="Профиль" showBackButton showProfileButton={false} />
      <Box paddingTop={90} paddingLeft={16} paddingRight={16}>
        <Box
          style={{ position: 'relative' }}
          backgroundColor={COLORS.PALE_BLUE}
          borderRadius={12}
          height={135}
          paddingRight={24}
          paddingLeft={24}
          paddingTop={24}
          paddingBottom={24}
          justifyContent="flex-end"
        >
          <Box
            style={{
              position: 'absolute',
              top: -50,
              left: 90,
              height: 100,
              right: 90,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box height={100} width={100} borderRadius={100} backgroundColor={COLORS.LIGHT_BLUE} />
          </Box>
          <TouchableOpacity onPress={handleSettingsClick}>
            <Box
              height={40}
              width={40}
              borderRadius={40}
              backgroundColor={COLORS.LIGHT_BLUE}
              alignItems="center"
              justifyContent="center"
              style={{
                position: 'absolute',
                top: -20,
                left: 50,
              }}
            >
              <SlidersIcon />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity>
            <Box
              height={40}
              width={40}
              borderRadius={40}
              backgroundColor={COLORS.LIGHT_BLUE}
              alignItems="center"
              justifyContent="center"
              style={{ position: 'absolute', top: -20, right: 50 }}
            >
              <BellIcon />
            </Box>
          </TouchableOpacity>
          <Typography weight={700} size={16} lineHeight={24} color={COLORS.BLACK} textAlign="center">
            {mainStore.profilePromise?.value?.firstName}
          </Typography>
          <Typography weight={400} size={14} lineHeight={18} color={COLORS.BLACK} textAlign="center">
            {mainStore.profilePromise?.value?.email}
          </Typography>
        </Box>
        <Box flex={1} paddingTop={8}>
          {DATA.map((item) => (
            <TouchableOpacity onPress={() => null}>
              <Box
                paddingTop={24}
                paddingBottom={24}
                flexDirection="row"
                alignItems="center"
                style={{ borderBottom: '1px solid var(--color-pale-blue)' }}
              >
                <Box flex={1}>
                  <Typography weight={700} size={16} lineHeight={24} color={COLORS.BLACK}>
                    {item.title}
                  </Typography>
                </Box>
                <CaretRightIcon />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    </Box>
  );
});
