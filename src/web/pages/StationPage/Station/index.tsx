import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { generatePath, useHistory } from 'react-router-dom';
import { Carousel } from 'web/components/Carousel';
import { Header } from 'web/components/Header';
import { API, ROUTES } from 'web/constant';
import { ConnectorItem } from 'web/pages/StationPage/Station/ConnectorItem';
import { store } from 'web/pages/StationPage/store';
import { ConnectorType } from 'web/types';

export const Station = observer(() => {
  const { stationPromise, connectorsPromise } = store;
  const { push, replace } = useHistory();

  function handlePress(connector: ConnectorType) {
    push(generatePath(ROUTES.CONNECTOR, { stationId: connector?.chargeStationId, connectorId: connector?.id }));
  }

  function handleBackClick() {
    replace(ROUTES.MAIN);
  }

  return (
    <Box flex={1}>
      <Header
        showProfileButton={false}
        showBackButton
        title="Выберите колонку"
        height={126}
        onBackClick={handleBackClick}
      />
      {stationPromise?.pending ? (
        <Loader />
      ) : (
        <Box paddingLeft={16} paddingRight={16}>
          <Box height={240} borderRadius={12} marginTop={-64} position="relative" className={styles.carousel}>
            <Carousel
              inlineDotContainer
              data={
                stationPromise?.value?.images?.map((item, index) => ({
                  key: index,
                  content: <img src={`${API.IMAGE}/${item.imageId}`} alt="" className={styles.image} />,
                })) || []
              }
            />
          </Box>

          <Box marginTop={16}>
            <Typography color={COLORS.BLACK} weight={600} size={18} lineHeight={22}>
              {stationPromise?.value?.address}
            </Typography>
          </Box>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={700} size={16} lineHeight={20}>
              {`№ ${stationPromise?.value?.id}`}
            </Typography>
          </Box>
          <Box marginTop={16}>
            {connectorsPromise?.value?.map((item) => (
              <Box marginTop={16} key={item.id}>
                <ConnectorItem onPress={() => handlePress(item)} item={item} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
});
