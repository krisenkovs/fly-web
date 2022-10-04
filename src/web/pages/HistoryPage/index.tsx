import styles from './styles.module.css';
import { TouchableOpacity } from 'components';
import { Box } from 'components/Box';
import { Loader } from 'components/Loader';
import { Pressable } from 'components/Pressable';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { ArrowsDownUp } from 'icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { store } from 'web/application/store';
import { Header } from 'web/components/Header';
import { diffDate, formatDateTime } from 'web/helpers/formatter';
import { InfoModal } from 'web/pages/HistoryPage/InfoModal';
import { TransactionType } from 'web/types';

export const HistoryPage = observer(() => {
  const [modal, setModal] = useState<{ visible: boolean; item?: TransactionType }>({
    visible: false,
    item: undefined,
  });

  const [sortDateOrder, setSortDateOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    store.loadTransactions('created', sortDateOrder);
  }, [sortDateOrder]);

  function handleItemPress(item: TransactionType) {
    setModal({ visible: true, item });
  }

  function handleClose() {
    setModal({ visible: false });
  }

  function changeSort() {
    setSortDateOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <Box flex={1} position="relative" overflow="hidden">
      <Header title="История заправок" showBackButton showProfileButton={false} />
      <Box
        borderBottomLeftRadius={12}
        borderBottomRightRadius={12}
        height={44}
        flexDirection="row"
        alignItems="center"
        backgroundColor={COLORS.PALE_BLUE}
        marginTop={-4}
        paddingLeft={16}
      >
        <TouchableOpacity onPress={changeSort}>
          <Box flexDirection="row" alignItems="center">
            <ArrowsDownUp height={20} width={20} color={COLORS.BLUE} />
            <Box marginLeft={8}>
              <Typography color={COLORS.BLUE} size={14} lineHeight={18} weight={600}>
                По дате
              </Typography>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
      {store.transactionsPromise?.pending ? (
        <Loader />
      ) : (
        <>
          <Box flex={1} marginLeft={16} marginRight={8} paddingRight={8} overflow="auto">
            {store.transactionsPromise?.value?.content?.map((item) => (
              <Pressable onPress={() => handleItemPress(item)} key={item?.id}>
                <Box paddingTop={16} paddingBottom={16} className={styles.item} paddingLeft={12} paddingRight={12}>
                  <Box flexDirection="row">
                    <Box flex={1}>
                      <Typography color={COLORS.BLACK} weight={500} size={16} lineHeight={20}>
                        {item?.status}
                      </Typography>
                    </Box>
                    <Typography color={COLORS.LIGHT_BLACK} weight={500} size={16} lineHeight={20}>
                      {`№ ${item?.chargeStationId}`}
                    </Typography>
                  </Box>
                  <Box flexDirection="row" marginTop={12}>
                    <Box flex={1}>
                      <Typography color={COLORS.BLACK} weight={400} size={14} lineHeight={18}>
                        {`${formatDateTime(item?.startTime)} ${diffDate(item?.startTime, item.stopTime)}`}
                      </Typography>
                    </Box>
                    <Typography color={COLORS.LIGHT_BLACK} weight={400} size={14} lineHeight={18}>
                      {`${(item?.currentEnergyImport || 0) - (item?.startEnergyImport || 0)} kW*h`}
                    </Typography>
                  </Box>
                </Box>
              </Pressable>
            ))}
          </Box>
        </>
      )}
      <InfoModal visible={modal.visible} onClose={handleClose} item={modal?.item} />
    </Box>
  );
});
