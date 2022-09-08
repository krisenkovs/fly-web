import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Radio } from 'components/Radio';
import React, { useState } from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export function ConnectorModal({ visible, onClose, onSelect }: Props) {
  const [selected, setSelected] = useState('');

  function handleClose() {
    onSelect?.(selected);
  }

  return (
    <Modal onClose={onClose} title="Разъём" visible={visible}>
      <Box marginTop={28} marginBottom={32}>
        <Radio label="CSS" onChecked={() => setSelected('CSS')} checked={selected === 'CSS'} />
        <Box marginTop={20}>
          <Radio label="CSHdeMO" onChecked={() => setSelected('CSHdeMO')} checked={selected === 'CSHdeMO'} />
        </Box>
        <Box marginTop={20}>
          <Radio label="Type2" onChecked={() => setSelected('Type2')} checked={selected === 'Type2'} />
        </Box>
      </Box>
      <Box marginTop={12}>
        <Button onClick={handleClose} label="Выбрать" />
      </Box>
    </Modal>
  );
}
