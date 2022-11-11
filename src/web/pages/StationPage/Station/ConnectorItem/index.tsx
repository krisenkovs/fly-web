import { Box } from 'components/Box';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CSHdeMOConnector, CSSConnector } from 'icons';
import React, { useMemo } from 'react';
import styles from 'web/pages/StationPage/Station/ConnectorItem/styles.module.css';
import { CONNECTOR, ConnectorType, STATUS } from 'web/types';

type Props = {
  onPress: (id: number) => void;
  item?: ConnectorType;
};

export function ConnectorItem({ onPress, item }: Props) {
  const connectorIcon = useMemo(() => {
    switch (item?.type) {
      case CONNECTOR.CSHdeMO:
        return <CSHdeMOConnector width={24} height={24} />;
      default:
        return <CSSConnector width={24} height={24} />;
    }
  }, [item]);

  const connectorColor = useMemo(() => {
    switch (item?.type) {
      case CONNECTOR.CSHdeMO:
        return COLORS.BLUE;
      default:
        return COLORS.BLACK;
    }
  }, [item]);

  const connectorStatus = useMemo(() => {
    switch (item?.status) {
      case STATUS.AVAILABLE:
        return 'Доступно';
      case STATUS.PREPARING:
        return 'Подготовка';
      default:
        return 'Не известно';
    }
  }, [item]);

  return (
    <Pressable onPress={() => item?.id && onPress(item?.id)}>
      <Box
        borderRadius={8}
        paddingTop={24}
        paddingBottom={24}
        paddingRight={12}
        paddingLeft={12}
        className={styles.container}
        flexDirection="row"
      >
        <Box width={40} height={40} borderRadius={20} backgroundColor={connectorColor} />
        <Box
          width={40}
          height={40}
          borderRadius={20}
          marginLeft={-14}
          alignItems="center"
          justifyContent="center"
          backgroundColor={COLORS.PALE_BLUE}
        >
          {connectorIcon}
        </Box>
        <Box marginLeft={30} flex={1}>
          <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
            {`Разъем ${item?.type}`}
          </Typography>
          <Box marginTop={8}>
            <Typography color={item?.availability ? COLORS.GREEN : COLORS.RED} weight={500} size={12} lineHeight={15}>
              {connectorStatus}
            </Typography>
          </Box>
        </Box>
        <Box marginLeft={30}>
          <Typography color={COLORS.LIGHT_BLACK} weight={500} size={12} lineHeight={15} textAlign="right">
            138kW
          </Typography>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={500} size={12} lineHeight={15} textAlign="right">
              Быстрая зарядка
            </Typography>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}
