import { store } from './store';
import styles from './styles.module.css';
import { Button, FloatInput, Loader, TouchableOpacity, Typography } from 'components';
import { Box } from 'components/Box';
import { COLORS } from 'constant';
import { CoinIcon, FlyIcon } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store as mainStore } from 'web/application/store';
import { CardView } from 'web/components/CardView';
import { Header } from 'web/components/Header';
import { ROUTES } from 'web/constant';

export const BalancePage = observer(() => {
  const { replace } = useHistory();
  const { loadAccount, accountPromise } = mainStore;
  const { upAccount, upAccountPromise, destroy, sum, setSum } = store;

  useEffect(() => {
    !accountPromise?.fulfilled && loadAccount();
    return destroy;
  }, []);

  useEffect(() => {
    if (upAccountPromise?.fulfilled) {
      if (upAccountPromise.value?.redirectUrl) {
        window.location.href = upAccountPromise.value?.redirectUrl;
      } else {
        loadAccount();
      }
    }
  }, [upAccountPromise?.fulfilled]);

  useEffect(() => {
    if (upAccountPromise?.rejected) {
      replace(ROUTES.PAY_ERROR);
    }
  }, [upAccountPromise?.rejected]);

  function handleUp() {
    upAccount(window.location.href);
  }

  function handleBackClick() {
    replace(ROUTES.PROFILE);
  }

  if (!accountPromise?.fulfilled){
    return null;
  }

  return (
    <Box flex={1}>
      <Header title="Пополнение баланса" showBackButton showProfileButton={false} onBackClick={handleBackClick} />
      <Box flex={1} paddingLeft={16} paddingRight={16} paddingBottom={48}>
        {accountPromise?.pending ? (
          <Loader />
        ) : (
          <>
            <Box
              marginTop={40}
              height={88}
              borderRadius={8}
              backgroundColor={COLORS.PALE_BLUE}
              paddingTop={16}
              paddingLeft={16}
              boxSizing="border-box"
              flexDirection="row"
              position="relative"
            >
              <Box flex={1}>
                <Typography color={COLORS.BLACK} size={14} lineHeight={18} weight={600}>
                  Баланс
                </Typography>
                <Box flexDirection="row" marginTop={4} alignItems="baseline">
                  <Typography color={COLORS.BLACK} size={24} lineHeight={30} weight={800}>
                    {accountPromise?.value?.amount || 0}
                  </Typography>
                  <Box marginLeft={4}>
                    <Typography color={COLORS.BLACK} size={12} lineHeight={16} weight={500}>
                      BYN
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box position="absolute" className={styles.icon}>
                <FlyIcon width={176} height={176} />
              </Box>
            </Box>
            <Box marginTop={40}>
              <Box flexDirection="row" alignItems="flex-end">
                <Box marginBottom={4}>
                  <CoinIcon />
                </Box>
                <Box marginLeft={8} flex={1}>
                  <FloatInput
                    type="number"
                    label="BYN"
                    onChange={setSum}
                    value={sum}
                    hideHint
                    max={100}
                    precision={2}
                  />
                </Box>
              </Box>
              <Box marginLeft={32} flexDirection="row" marginTop={12}>
                {[15, 25, 50, 100].map((item, index) => (
                  <Box flex={1} key={index}>
                    <TouchableOpacity onPress={() => setSum(item?.toString())}>
                      <Box
                        marginLeft={index ? 8 : 0}
                        height={32}
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={COLORS.PALE_BLUE}
                        borderRadius={8}
                      >
                        <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
                          {item}
                        </Typography>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box marginTop={40} marginBottom={20}>
              <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
                Способ оплаты
              </Typography>
            </Box>
            <CardView />
            <Box flex={1} />
            <Button label="Пополнить" disabled={!Number(sum)} onClick={handleUp} loading={upAccountPromise?.pending} />
          </>
        )}
      </Box>
    </Box>
  );
});
