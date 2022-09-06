import { Box } from 'components/Box';
import Skeleton from 'components/Skeleton';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { store } from 'web/application/store';
import { Header } from 'web/components/Header';

export const HistoryPage = observer(() => {
  useEffect(() => {
    store.loadTransactions();
  }, []);

  return (
    <Box flex={1}>
      <Header title="История заправок" showBackButton showProfileButton={false} />
      {store.transactionsPromise?.pending ? (
        <Box paddingTop={16} paddingLeft={16} paddingRight={16}>
          <Skeleton.Row />
        </Box>
      ) : (
        <Box flex={1} marginLeft={16} marginRight={16}>
          {store.transactionsPromise?.value?.content?.map((item) => (
            <Box
              key={item?.id}
              paddingTop={16}
              paddingBottom={16}
              style={{ borderBottom: '1px solid var(--color-additional-grey)' }}
            >
              <Box flexDirection="row">
                <Box flex={1}>
                  <Typography color={COLORS.BLACK} weight={500} size={16} lineHeight={20}>
                    {item?.chargeStationId}
                  </Typography>
                </Box>
                <Typography color={COLORS.LIGHT_BLACK} weight={500} size={16} lineHeight={20}>
                  {item?.connectorId}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});
