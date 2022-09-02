import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Pressable } from 'components/Pressable';
import Skeleton from 'components/Skeleton';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { store } from 'web/application/store';
import { ROUTES } from 'web/constant';

type Props = {
  height: number;
};

export const StationsSheet = observer(function StationsSheet({ height }: Props) {
  const [h, setH] = useState<string | number>(height);
  const [isFull, setFull] = useState(false);
  const { push } = useHistory();

  function toFull() {
    setH('100%');
    setFull(true);
  }
  function toSmall() {
    setH(height);
    setFull(false);
  }

  function handleStationClick(id: string | number) {
    push(generatePath(ROUTES.STATION, { stationId: id }));
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
          <Box className={styles.list}>
            <Skeleton.Row height={24} />
          </Box>
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
