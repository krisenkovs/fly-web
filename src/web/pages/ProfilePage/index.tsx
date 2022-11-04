import styles from './styles.module.css';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { BellIcon, CaretRightIcon, SlidersIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
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
  const { upAccount, upAccountPromise } = store;

  useEffect(() => {
    if (upAccountPromise?.fulfilled) {
      if (upAccountPromise.value?.redirectUrl) {
        window.location.href = upAccountPromise.value?.redirectUrl;
      }
    }
  }, [upAccountPromise?.fulfilled]);

  useEffect(() => {
    if (upAccountPromise?.error) {
      push(ROUTES.PAY_ERROR);
    }
  }, [upAccountPromise?.error]);

  function handleUp() {
    upAccount(window.location.href);
  }

  function handleSettingsClick() {
    push(ROUTES.SETTINGS);
  }

  function handleNotificationClick() {
    push(ROUTES.NOTIFICATION);
  }

  function handleItemRoute(route?: ROUTES) {
    route && push(route);
  }

  function handleBackClick() {
    push(ROUTES.MAIN);
  }

  return (
    <Box flex={1}>
      <Header title="Профиль" showBackButton showProfileButton={false} onBackClick={handleBackClick} />
      <Box paddingTop={90} paddingLeft={16} paddingRight={16}>
        <Box
          position="relative"
          boxSizing="border-box"
          backgroundColor={COLORS.PALE_BLUE}
          borderRadius={12}
          height={168}
          paddingTop={64}
        >
          <Box className={styles.avatar}>
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
              className={styles.leftButton}
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
              className={styles.rightButton}
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
          <Box flex={1} />
          <TouchableOpacity onPress={handleUp}>
            <Box
              height={42}
              backgroundColor={COLORS.BLUE}
              borderBottomLeftRadius={12}
              borderBottomRightRadius={12}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography color={COLORS.WHITE} size={14} weight={400} lineHeight={18}>
                Баланс
              </Typography>
              <Box marginLeft={8}>
                <Typography color={COLORS.WHITE} size={14} weight={700} lineHeight={18}>
                  {`${store.accountPromise?.value?.amount || 0} BYN`}
                </Typography>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>

        <Box flex={1} paddingTop={8}>
          {DATA.map((item) => (
            <TouchableOpacity onPress={() => handleItemRoute(item?.route)} disabled={item?.disabled} key={item.id}>
              <Box paddingTop={24} paddingBottom={24} flexDirection="row" alignItems="center" className={styles.item}>
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
