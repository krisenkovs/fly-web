import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React from 'react';
import { TransactionType } from 'web/types';

type Props = {
  visible: boolean;
  onClose: () => void;
  item?: TransactionType;
};

export function InfoModal({ visible, onClose, item }: Props) {
  return (
    <Modal onClose={onClose} title="Сменить фото" visible={visible}>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время старта
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {item?.startTime}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время завершения
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {item?.stopTime}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Сумма
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {item?.finalAmount}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
