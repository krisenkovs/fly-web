import { Carousel } from './Carousel';
import { Connector } from './Connector';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory, generatePath, useParams } from 'react-router-dom';
import { store } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { useStation } from 'web/helpers/useStation';

export const StationPage = observer(() => {
  const { push } = useHistory();
  const params = useParams<{ stationId: string }>();

  const station = useStation(+params?.stationId);

  function handlePress(connectorId: number) {
    push(generatePath(ROUTES.PAYMENT, { ...params, connectorId: connectorId }));
  }

  return (
    <Box flex={1}>
      <Header showProfileButton={false} showBackButton title="Выберите колонку" height={126} />
      {store.connectorsPromise?.pending ? (
        <Loader />
      ) : (
        <Box paddingLeft={16} paddingRight={16}>
          <Carousel data={station?.images || []} />
          <Box marginTop={16}>
            <Typography color={COLORS.BLACK} weight={600} size={18} lineHeight={22}>
              {station?.address}
            </Typography>
          </Box>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={700} size={16} lineHeight={20}>
              {`№ ${params?.stationId}`}
            </Typography>
          </Box>
          <Box marginTop={16}>
            {store?.connectorsPromise?.value?.map((item) => (
              <Box marginTop={16} key={item.id}>
                <Connector onPress={handlePress} item={item} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
});
