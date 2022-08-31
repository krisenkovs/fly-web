import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { store } from 'web/application/store';
import { ROUTES } from 'web/constant';

type Props = {
  height: number;
};

export const StationsSheet = observer(function StationsSheet({ height }: Props) {
  const [h, setH] = useState<string | number>(height);
  const [isFull, setFull] = useState(false);
  const navigate = useNavigate();

  function toFull() {
    setH('100%');
    setFull(true);
  }
  function toSmall() {
    setH(height);
    setFull(false);
  }

  function handleStationClick(id: number) {
    store.setSelectedStation(id);
    navigate(ROUTES.STATION);
  }

  return (
    <Box className={styles.content} style={{ height: h }}>
      <Pressable onPress={() => (isFull ? toSmall() : toFull())}>
        <Box alignItems="center">
          <Box
            width={40}
            height={6}
            marginTop={16}
            marginBottom={16}
            borderRadius={8}
            backgroundColor={COLORS.LIGHT_BLUE}
          />
        </Box>
      </Pressable>
      <Box paddingRight={16} paddingLeft={16}>
        <Typography size={18} lineHeight={24} weight={700} color={COLORS.BLACK}>
          Выбрать станцию
        </Typography>
      </Box>
      <Box flex={1}>
        {store.stationsPromise?.pending ? (
          <Loader />
        ) : (
          <Box className={styles.list}>
            {store.stationsPromise?.value?.content?.map((item) => (
              <Pressable onPress={() => handleStationClick(item?.id)} key={item?.id}>
                <Box className={styles.listItem}>
                  <Typography size={16} lineHeight={20} weight={500} color={COLORS.BLACK}>
                    {item.address}
                  </Typography>
                  <Box marginTop={4}>
                    <Typography
                      size={14}
                      lineHeight={18}
                      weight={700}
                      color={COLORS.LIGHT_BLACK}
                    >{`№ ${item.id}`}</Typography>
                  </Box>
                </Box>
              </Pressable>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
});
