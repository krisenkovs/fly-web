import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function ConditionModal({ visible, onClose }: Props) {
  return (
    <Modal onClose={onClose} title="Политика конфиденциальности" visible={visible}>
      <Box marginTop={24} marginBottom={24}>
        <Typography color={COLORS.BLACK} weight={400} size={16} lineHeight={24}>
          политика пока еще не готова
        </Typography>
      </Box>
    </Modal>
  );
}
