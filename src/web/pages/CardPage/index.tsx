import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { useLocationParams } from 'web/helpers/useLocationParams';

export const CardPage = observer(function CardPage() {
  const { push } = useHistory();
  const locationParams = useLocationParams();

  const token = locationParams.get('token') || '';
  const status = locationParams.get('status') || '';

  useEffect(() => {}, [locationParams]);

  function handlePress() {
    push(ROUTES.MAIN);
  }

  return (
    <Box flex={1}>
      <Header title="Привязка карты" showBackButton showProfileButton={false} />
      <Box flex={1} />
      <Box marginLeft={16} marginRight={16} flexDirection="row" justifyContent="center" alignItems="center">
        <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={24} textAlign="center">
          Информацию по добавленным картам вы сможете просмотреть и изменить в профиле в разделе “Платежная информация”
        </Typography>
      </Box>
      {status === 'error' && (
        <Box
          marginTop={20}
          backgroundColor={COLORS.BG_RED}
          paddingBottom={12}
          paddingTop={12}
          paddingLeft={12}
          paddingRight={12}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          borderRadius={12}
          marginLeft={16}
          marginRight={16}
        >
          <Typography color={COLORS.RED} weight={400} size={14} lineHeight={24}>
            Не удалось привязать карту.
          </Typography>
        </Box>
      )}
      <Box flex={1} />
      <Box marginBottom={48} marginLeft={16} marginRight={16}>
        <Button label="На главную" onClick={handlePress} disabled={!status} />
      </Box>
    </Box>
  );
});
