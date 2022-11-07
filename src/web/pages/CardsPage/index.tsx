import { TouchableOpacity, Typography } from 'components';
import { Box } from 'components/Box';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { CardView } from 'web/components/CardView';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';
import { store } from 'web/pages/CardsPage/store';

export const CardsPage = observer(() => {
  const { replace } = useHistory();
  const { cardPromise, loadCard } = mainStore;
  const { tieCard, tieCardPromise, destroy } = store;

  useEffect(() => {
    return destroy;
  }, []);

  useEffect(() => {
    if (tieCardPromise?.fulfilled) {
      if (tieCardPromise.value?.redirectUrl) {
        window.location.href = tieCardPromise.value?.redirectUrl;
      } else {
        loadCard();
      }
    }
  }, [tieCardPromise?.fulfilled]);

  function handleChangePress() {
    tieCard(window.location.href);
  }

  function handleBackClick() {
    replace(ROUTES.PROFILE);
  }

  return (
    <Box flex={1}>
      <Header title="Платежная информация" showBackButton showProfileButton={false} onBackClick={handleBackClick} />
      <Box flex={1} marginLeft={16} marginRight={16} paddingTop={40}>
        <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
          Способ оплаты
        </Typography>
        <Box paddingTop={20}>{cardPromise?.value && <CardView />}</Box>
        {cardPromise?.value && (
          <Box paddingTop={20} justifyContent="end" flexDirection="row">
            <TouchableOpacity onPress={handleChangePress}>
              <Typography weight={700} size={16} lineHeight={20} color={COLORS.BLUE}>
                Редактировать
              </Typography>
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </Box>
  );
});
