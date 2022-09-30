import { TouchableOpacity, Typography } from 'components';
import { Box } from 'components/Box';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { store } from 'web/application/store';
import { CardView } from 'web/components/CardView';
import { Header } from 'web/components/Header';

export const CardsPage = observer(() => {
  useEffect(() => {
    return () => store.clearPaid();
  }, []);
  useEffect(() => {
    if (store.tieCardPromise?.fulfilled) {
      if (store.tieCardPromise.value?.redirectUrl) {
        window.location.href = store.tieCardPromise.value?.redirectUrl;
      }
    }
  }, [store.tieCardPromise?.fulfilled]);

  function handleChangePress() {
    store.tieCard(window.location.href);
  }

  return (
    <Box flex={1}>
      <Header title="Платежная информация" showBackButton showProfileButton={false} />
      <Box flex={1} marginLeft={16} marginRight={16} paddingTop={40}>
        <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
          Способ оплаты
        </Typography>
        <Box paddingTop={20}>{store.cardPromise?.value && <CardView card={store.cardPromise?.value} />}</Box>
        <Box paddingTop={20} justifyContent="end" flexDirection="row">
          <TouchableOpacity onPress={handleChangePress}>
            <Typography weight={700} size={16} lineHeight={20} color={COLORS.BLUE}>
              Редактировать
            </Typography>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
});
