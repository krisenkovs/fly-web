import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React from 'react';
import { diffDate, formatDateTime } from 'web/helpers/formatter';
import { TransactionType } from 'web/types';

type Props = {
  visible: boolean;
  onClose: () => void;
  item?: TransactionType;
};

export function InfoModal({ visible, onClose, item }: Props) {
  return (
    <Modal onClose={onClose} title="Информация о заправке" visible={visible}>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время старта
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {formatDateTime(item?.startTime)}
          </Typography>
        </Box>
      </Box>
      {item?.stopTime && (
        <Box marginTop={20}>
          <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
            Время завершения
          </Typography>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
              {formatDateTime(item?.stopTime)}
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
            {item?.finalPrice}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Заряд
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${(item?.currentEnergyImport || 0) - (item?.startEnergyImport || 0)} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Адрес заправки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}></Typography>
        </Box>
      </Box>
      <Box marginTop={20} marginBottom={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время зарядки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {diffDate(item?.startTime, item?.stopTime)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
