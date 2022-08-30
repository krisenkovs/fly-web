import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CSSConnector } from 'icons';
import React from 'react';
import { ConnectorType } from 'web/types';

type Props = {
  onPress: (id: number) => void;
  item?: ConnectorType;
};

export function Connector({ onPress, item }: Props) {
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
        <Box width={40} height={40} borderRadius={20} backgroundColor={COLORS.BLACK} />
        <Box
          width={40}
          height={40}
          borderRadius={20}
          backgroundColor={COLORS.PALE_BLUE}
          marginLeft={-14}
          alignItems="center"
          justifyContent="center"
        >
          <CSSConnector width={24} height={24} />
        </Box>
        <Box marginLeft={30} flex={1}>
          <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
            Разъем CCS
          </Typography>
          <Box marginTop={8}>
            <Typography color={item?.availability ? COLORS.GREEN : COLORS.RED} weight={500} size={12} lineHeight={15}>
              {item?.availability ? 'Доступна' : 'Не доступна'}
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
