import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { store } from 'web/application/store';
import { Header } from 'web/components/Header';
import { InfoModal } from 'web/pages/HistoryPage/InfoModal';
import { TransactionType } from 'web/types';

export const HistoryPage = observer(() => {
  const [modal, setModal] = useState<{ visible: boolean; item?: TransactionType }>({
    visible: false,
    item: undefined,
  });

  useEffect(() => {
    store.loadTransactions();
  }, []);

  function handleItemPress(item: TransactionType) {
    setModal({ visible: true, item });
  }

  function handleClose() {
    setModal({ visible: false });
  }

  return (
    <Box flex={1} position="relative" overflow="hidden">
      <Header title="История заправок" showBackButton showProfileButton={false} />
      {store.transactionsPromise?.pending ? (
        <Loader />
      ) : (
        <Box flex={1} marginLeft={16} marginRight={8} paddingRight={8} overflow="auto">
          {store.transactionsPromise?.value?.content?.map((item) => (
            <Pressable onPress={() => handleItemPress(item)} key={item?.id}>
              <Box
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
            </Pressable>
          ))}
        </Box>
      )}
      <InfoModal visible={modal.visible} onClose={handleClose} item={modal?.item} />
    </Box>
  );
});
