import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import React from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function ConnectorModal({ visible, onClose }: Props) {
  return (
    <Modal onClose={onClose} title="Разъём" visible={visible}>
      <Box marginTop={12}>
        <Button onClick={onClose} label="Выбрать" />
      </Box>
    </Modal>
  );
}
