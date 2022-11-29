import { store } from './store';
import { Box, Modal, Typography } from 'components';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { formatDateTime } from 'web/helpers/formatter';

export const InfoModal = observer(() => {
  const { visible, hide, data } = store;

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
      {formatDateTime(data?.stopTime) && (
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
            {Math.round((data?.finalPrice || 0) * 100) / 100}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Заряд
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${data?.finalAmount} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Максимальная мощность
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${data?.maxPowerImport} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20} marginBottom={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Адрес заправки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {data?.stationAddress}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
});
