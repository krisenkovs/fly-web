import { store } from './store';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Radio } from 'components/Radio';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { CONNECTOR } from 'web/pages/CarPage/ConnectorModal/types';

type Props = {
  onSelect: (value?: CONNECTOR) => void;
};

export const ConnectorModal = observer(({ onSelect }: Props) => {
  const { visible, hide, data, setSelected } = store;

  function handleClose() {
    onSelect?.(data);
  }

  return (
    <Modal onClose={hide} title="Разъём" visible={visible}>
      <Box marginTop={28} marginBottom={32}>
        <Radio label="CSS" onChecked={() => setSelected(CONNECTOR.CSS)} checked={data === CONNECTOR.CSS} />
        <Box marginTop={20}>
          <Radio
            label="CSHdeMO"
            onChecked={() => setSelected(CONNECTOR.CSHdeMO)}
            checked={data === CONNECTOR.CSHdeMO}
          />
        </Box>
      </Box>
      <Box marginTop={12}>
        <Button onClick={handleClose} label="Выбрать" />
      </Box>
    </Modal>
  );
});
