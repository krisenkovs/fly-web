import { store } from './store';
import styles from './styles.module.css';
import { Box, Pressable, Skeleton, Typography } from 'components';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, TouchEvent, useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import { ROUTES } from 'web/constant';

type Props = {
  height: number;
};

export const StationsSheet = observer(function StationsSheet({ height }: Props) {
  const [h, setH] = useState<string | number>(height);
  const [isFull, setFull] = useState(false);
  const [down, setDown] = useState(0);
  const { push } = useHistory();

  function toFull() {
    setH('100%');
    setFull(true);
  }
  function toSmall() {
    setH(height);
    setFull(false);
  }

  const move = (y: number) => {
    if (down) {
      const diff = down - y;

      if (diff > 3) {
        toFull();
      }

      if (diff < -3) {
        toSmall();
      }
    }
  };

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    move(e.clientY || 0);
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    move(e.touches?.[0]?.clientY || 0);
  }

  function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    setDown(e?.clientY || 0);
  }
  function handleTouchDown(e: TouchEvent<HTMLDivElement>) {
    setDown(e?.touches?.[0]?.clientY || 0);
  }
  function handleMouseUp() {
    setDown(0);
  }
  function handleClick() {
    isFull ? toSmall() : toFull();
  }

  function handleStationClick(id: string | number) {
    push(generatePath(ROUTES.STATION, { stationId: id }));
  }

  return (
    <Box className={styles.content} style={{ height: h }}>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={handleClick}
        className={styles.touch}
      >
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
      </div>
      <Box paddingRight={16} paddingLeft={16}>
        <Typography size={18} lineHeight={24} weight={700} color={COLORS.BLACK}>
          Выбрать станцию
        </Typography>
      </Box>
      <Box flex={1} overflow="hidden">
        {store.stationsPromise?.pending ? (
          <Box className={styles.list}>
            <Skeleton.Row height={24} />
          </Box>
        ) : (
          <Box className={styles.list} overflow="auto">
            {store.stationsPromise?.value?.content?.map((item) => (
              <Pressable onPress={() => handleStationClick(item?.id)} key={item?.id}>
                <Box className={styles.listItem}>
                  <Typography size={16} lineHeight={20} weight={500} color={COLORS.BLACK}>
                    {item?.name}
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
