import { store } from './store';
import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { diffDate, formatDateTime } from 'web/helpers/formatter';
import { Field } from 'web/pages/HistoryPage/InfoModal/Field';

export const InfoModal = observer(() => {
  const { hide, visible, data } = store;
  return (
    <Modal onClose={hide} title="Информация о заправке" visible={visible}>
      <Box marginBottom={20}>
        <Field label="Время старта" value={formatDateTime(data?.startTime)} />

        {!!data?.stopTime && <Field label="Время завершения" value={formatDateTime(data?.stopTime)} />}
        {!!data?.stopTime && <Field label="Время зарядки" value={diffDate(data?.startTime, data?.stopTime)} />}
        <Field label="Тип оплаты" value={data?.paymentType === 'CARD' ? 'Карта' : 'Баланс'} />
        {!!data?.finalPrice && <Field label="Сумма" value={`${data?.finalPrice} BYN`} />}
        {!!data?.maxPowerImport && <Field label="Максимальная мощность" value={`${data?.maxPowerImport} kW*h`} />}
        {!!data?.finalAmount && <Field label="Заряд" value={`${data?.finalAmount} kW*h`} />}
        {!!data?.initAmount && <Field label="Запрошено" value={`${data?.initAmount} kW*h`} />}
        {!!data?.currentEnergyPercent && <Field label="Заряжено" value={`${data?.currentEnergyPercent} %`} />}
        {!!data?.rate && <Field label="Тариф" value={data?.rate} />}
        <Field label="Адрес заправки" value={data?.stationAddress} />
      </Box>
    </Modal>
  );
});
