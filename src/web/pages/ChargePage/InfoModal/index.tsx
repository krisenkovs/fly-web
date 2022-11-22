import { store } from './store';
import { Box, Modal, Typography } from 'components';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { formatDateTime } from 'web/helpers/formatter';

export const InfoModal = observer(() => {
  const { visible, hide, data } = store;
  const power = useMemo(() => {
    return (
      Math.round(((data?.transaction?.currentEnergyImport || 0) - (data?.transaction?.startEnergyImport || 0)) * 10) /
      10
    );
  }, [data?.transaction]);

  return (
    <Modal onClose={hide} title="Информация о заправке" visible={visible}>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Время старта
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {formatDateTime(data?.transaction?.startTime)}
          </Typography>
        </Box>
      </Box>
      {formatDateTime(data?.transaction?.stopTime) && (
        <Box marginTop={20}>
          <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
            Время завершения
          </Typography>
          <Box marginTop={8}>
            <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
              {formatDateTime(data?.transaction?.stopTime)}
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
            {Math.round(power * (data?.station?.rate || 0) * 100) / 100}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Заряд
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${power} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Максимальная мощность
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {`${data?.transaction?.maxPowerImport} kW*h`}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={20} marginBottom={20}>
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
          Адрес заправки
        </Typography>
        <Box marginTop={8}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={14} lineHeight={18}>
            {data?.station?.address}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
});
