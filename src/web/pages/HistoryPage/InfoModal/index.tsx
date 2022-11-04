import { store } from './store';
import { Box } from 'components/Box';
import { Modal } from 'components/Modal';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { diffDate, formatDateTime } from 'web/helpers/formatter';

export const InfoModal = observer(() => {
  const { hide, visible, data } = store;
  return (
    <Modal onClose={hide} title="Информация о заправке" visible={visible}>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время старта
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {formatDateTime(data?.startTime)}
          </Typography>
        </Box>
      </Box>
      {data?.stopTime && (
        <Box marginTop={20}>
          <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
            Время завершения
          </Typography>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
              {formatDateTime(data?.stopTime)}
            </Typography>
          </Box>
        </Box>
      )}
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Сумма
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {data?.finalPrice}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Заряд
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${(data?.currentEnergyImport || 0) - (data?.startEnergyImport || 0)} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Адрес заправки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {data?.stationAddress}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20} marginBottom={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время зарядки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {diffDate(data?.startTime, data?.stopTime)}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
});
