import { store } from './store';
import { Box, Modal } from 'components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { diffDate, formatDateTime } from 'web/helpers/formatter';
import { Field } from 'web/pages/ChargePage/InfoModal/Field';
import { PAYMENT_TYPE } from 'web/types';

export const InfoModal = observer(() => {
  const { visible, hide, data } = store;

  return (
    <Modal onClose={hide} title="Информация о заправке" visible={visible}>
      <Box marginBottom={20} overflow="auto">
        <Field label="Время старта" value={formatDateTime(data?.startTime)} />

        {data?.percLimit === 100 && <Field label="Режим заправки" value="Полный бак" />}
        {data?.percLimit === 80 && <Field label="Режим заправки" value="80%" />}
        {!data?.percLimit && <Field label="Режим заправки" value="Фиксированная сумма" />}
        {!!data?.stopTime && <Field label="Время завершения" value={formatDateTime(data?.stopTime)} />}
        {!!data?.stopTime && <Field label="Время зарядки" value={diffDate(data?.startTime, data?.stopTime)} />}
        <Field label="Тип оплаты" value={data?.paymentType === 'CARD' ? 'Карта' : 'Баланс'} />
        {!!data?.finalPrice && <Field label="Сумма" value={`${data?.finalPrice} BYN`} />}
        {!!data?.initPrice && data?.paymentType === PAYMENT_TYPE.CARD && (
          <Field label="Списано с карты" value={`${data?.initPrice} BYN`} />
        )}
        {!!data?.refundAmount && data?.paymentType == PAYMENT_TYPE.CARD && (
          <Field label="Возврат" value={`${data?.refundAmount} BYN`} />
        )}
        {!!data?.maxPowerImport && <Field label="Максимальная мощность" value={`${data?.maxPowerImport} kW*h`} />}
        {!!data?.finalAmount && <Field label="Заряд" value={`${data?.finalAmount} kW*h`} />}
        {!!data?.initAmount && <Field label="Запрошено" value={`${data?.initAmount} kW*h`} />}
        {!!data?.lastEvEnergyPercent && <Field label="Заряжено" value={`${data?.lastEvEnergyPercent} %`} />}
        {!!data?.rate && <Field label="Тариф" value={data?.rate} />}
        <Field label="Адрес заправки" value={data?.stationAddress} />
      </Box>
    </Modal>
  );
});
