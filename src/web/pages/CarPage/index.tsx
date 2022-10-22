import { store as connectorModalStore } from './ConnectorModal/store';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Header } from 'web/components/Header';
import { ConnectorModal } from 'web/pages/CarPage/ConnectorModal';
import { CONNECTOR } from 'web/pages/CarPage/ConnectorModal/types';

export const CarPage = observer(() => {
  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    model: { required: { message: 'Укажите марку авто' } },
    capacity: { required: { message: 'Укажите емкость' } },
    power: { required: { message: 'Укажите запас хода' } },
  });

  useEffect(() => {
    resetFields();
  }, []);

  function handleSave() {
    validateFields().then();
  }

  function handleConnectorChange(value?: CONNECTOR) {
    setFieldValue('connector', value);
    connectorModalStore.hide();
  }

  function handleConnectorCLick() {
    connectorModalStore.show(values.connector);
  }

  return (
    <Box flex={1} position="relative">
      <Header title="Мой автомобиль" showBackButton showProfileButton={false} />
      <Box
        marginTop={24}
        marginLeft={16}
        marginRight={16}
        marginBottom={16}
        backgroundColor={COLORS.PALE_BLUE}
        paddingTop={16}
        paddingRight={16}
        paddingBottom={16}
        paddingLeft={16}
        borderRadius={12}
      >
        <FloatInput
          label="Марка авто"
          type="text"
          value={values?.model}
          hint={errors?.model}
          onChange={(value) => setFieldValue('model', value)}
        />
        <FloatInput
          label="Разъём"
          type="text"
          value={values?.connector}
          hint={errors?.connector}
          onClick={handleConnectorCLick}
        />
        <FloatInput
          label="Емкость батареи (kW*h)"
          type="number"
          value={values?.capacity}
          hint={errors?.capacity}
          onChange={(value) => setFieldValue('capacity', value)}
        />
        <FloatInput
          label="Запас хода (км)"
          type="number"
          value={values?.power}
          hint={errors?.power}
          onChange={(value) => setFieldValue('power', value)}
        />
      </Box>
      <Box flex={1} />
      <Box marginLeft={16} marginRight={16} marginBottom={48}>
        <Button onClick={handleSave} label="Сохранить" disabled={hasError || !changed} />
      </Box>
      <ConnectorModal onSelect={handleConnectorChange} />
    </Box>
  );
});
