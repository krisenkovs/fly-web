import { store as connectorModalStore } from './ConnectorModal/store';
import { store } from './store';
import { Loader } from 'components';
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
import { CarType } from 'web/types';

export const CarPage = observer(() => {
  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    brand: { required: { message: 'Укажите марку авто' } },
    batteryCapacity: { required: { message: 'Укажите емкость' } },
    powerReserve: { required: { message: 'Укажите запас хода' } },
  });

  const { loadCarInfo, saveCarInfo, destroy, carPromise, savePromise } = store;

  useEffect(() => {
    loadCarInfo();
    return destroy;
  }, []);

  useEffect(() => {
    if (carPromise?.fulfilled) {
      resetFields(carPromise?.value);
    }
  }, [carPromise?.fulfilled]);

  useEffect(() => {
    if (savePromise?.fulfilled) {
      resetFields(savePromise?.value);
    }
  }, [savePromise?.fulfilled]);

  function handleSave() {
    validateFields().then((values) => saveCarInfo(values as CarType));
  }

  function handleConnectorChange(value?: CONNECTOR) {
    setFieldValue('connectorType', value);
    connectorModalStore.hide();
  }

  function handleConnectorCLick() {
    connectorModalStore.show(values.connector);
  }

  return (
    <Box flex={1} position="relative">
      <Header title="Мой автомобиль" showBackButton showProfileButton={false} />

      {carPromise?.pending || !carPromise?.fulfilled ? (
        <Loader />
      ) : (
        <>
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
              value={values?.brand}
              hint={errors?.brand}
              onChange={(value) => setFieldValue('brand', value)}
            />
            <FloatInput
              label="Разъём"
              type="text"
              value={values?.connectorType}
              readonly
              hint={errors?.connectorType}
              onClick={handleConnectorCLick}
            />
            <FloatInput
              label="Емкость батареи (kW*h)"
              type="number"
              value={values?.batteryCapacity}
              hint={errors?.batteryCapacity}
              onChange={(value) => setFieldValue('batteryCapacity', value)}
            />
            <FloatInput
              label="Запас хода (км)"
              type="number"
              value={values?.powerReserve}
              hint={errors?.powerReserve}
              onChange={(value) => setFieldValue('powerReserve', value)}
            />
          </Box>
          <Box flex={1} />
          <Box marginLeft={16} marginRight={16} marginBottom={48}>
            <Button
              onClick={handleSave}
              label="Сохранить"
              disabled={hasError || !changed}
              loading={savePromise?.pending}
            />
          </Box>
        </>
      )}

      <ConnectorModal onSelect={handleConnectorChange} />
    </Box>
  );
});
