import { store } from './store';
import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';

export const ConditionModal = observer(() => {
  const { visible, hide } = store;

  return (
    <Modal onClose={hide} title="Политика конфиденциальности" visible={visible}>
      <Box marginTop={24} marginBottom={24}>
        <Typography color={COLORS.BLACK} weight={400} size={16} lineHeight={24}>
          политика пока еще не готова
        </Typography>
      </Box>
    </Modal>
  );
});
