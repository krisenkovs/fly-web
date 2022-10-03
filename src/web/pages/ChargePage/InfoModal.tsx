import { Box, Modal, Typography } from 'components';
import { COLORS } from 'constant';
import React from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
  power: number;
  sum: number;
  address?: string;
  startDate: string;
  endDate: string;
};

export function InfoModal({ visible, onClose, power, sum, startDate, endDate, address }: Props) {
  return (
    <Modal onClose={onClose} title="Информация о заправке" visible={visible}>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время старта
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {startDate}
          </Typography>
        </Box>
      </Box>
      {endDate && (
        <Box marginTop={20}>
          <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
            Время завершения
          </Typography>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
              {endDate}
            </Typography>
          </Box>
        </Box>
      )}
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Сумма
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {sum}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Заряд
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${power} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20} marginBottom={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Адрес заправки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {address}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
