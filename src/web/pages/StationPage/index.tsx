import { Carousel } from './Carousel';
import { Connector } from './Connector';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export const StationPage = observer(() => {
  const navigation = useNavigate();

  /*useEffect(() => {
    mainStore?.currentTransactionPromise?.value?.status === 'CREATED' && navigation(ROUTES.MAIN);
  }, [mainStore?.currentTransactionPromise?.value]);*/

  function handlePress(id: number) {
    mainStore.setSelectedConnector(id);
    navigation(`${ROUTES.PAYMENT}`);
  }

  return (
    <Box flex={1}>
      <Header showProfileButton={false} showBackButton title="Выберите колонку" height={126} />
      <Box paddingLeft={16} paddingRight={16}>
        <Carousel data={mainStore?.currentStation?.images || []} />
        <Box marginTop={16}>
          <Typography color={COLORS.BLACK} weight={600} size={18} lineHeight={22}>
            {mainStore?.currentStation?.address}
          </Typography>
        </Box>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={700} size={16} lineHeight={20}>
            {`№ ${mainStore?.currentStation?.id}`}
          </Typography>
        </Box>
        <Box marginTop={16}>
          {mainStore?.connectorsPromise?.value?.map((item) => (
            <Box marginTop={16} key={item.id}>
              <Connector onPress={handlePress} item={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
});
