import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { BellIcon, CaretRightIcon, SlidersIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { store } from 'web/application/store';
import { AvatarView } from 'web/components/AvatarView';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

const DATA = [
  {
    id: 'history',
    title: 'История заправок',
    route: ROUTES.HISTORY,
    disabled: false,
  },
  {
    id: 'model',
    title: 'Мой автомобиль',
    route: ROUTES.CAR,
    disabled: false,
  },
  {
    id: 'payment',
    title: 'Платежная информация',
    disabled: false,
    route: ROUTES.CARDS,
  },
  {
    id: 'about',
    title: 'О приложении',
    disabled: false,
    route: ROUTES.ABOUT,
  },
  {
    id: 'help',
    title: 'Помощь',
    disabled: false,
    route: ROUTES.HELP,
  },
];

export const ProfilePage = observer(() => {
  const { push } = useHistory();

  function handleSettingsClick() {
    push(ROUTES.SETTINGS);
  }

  function handleNotificationClick() {
    push(ROUTES.NOTIFICATION);
  }

  function handleItemRoute(route?: ROUTES) {
    route && push(route);
  }

  return (
    <Box flex={1}>
      <Header title="Профиль" showBackButton showProfileButton={false} />
      <Box paddingTop={90} paddingLeft={16} paddingRight={16}>
        <Box
          position="relative"
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
            <AvatarView
              size={100}
              photoId={store.profilePromise?.value?.photoId}
              avatarCode={store.profilePromise?.value?.avatarCode}
            />
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
          <TouchableOpacity onPress={handleNotificationClick}>
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
            {`${store.profilePromise?.value?.firstName || ''} ${store.profilePromise?.value?.lastName || ''}`}
          </Typography>
          <Typography weight={400} size={14} lineHeight={18} color={COLORS.BLACK} textAlign="center">
            {store.profilePromise?.value?.email}
          </Typography>
        </Box>
        <Box flex={1} paddingTop={8}>
          {DATA.map((item) => (
            <TouchableOpacity onPress={() => handleItemRoute(item?.route)} disabled={item?.disabled}>
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
