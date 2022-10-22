import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const PayErrorPage = observer(() => {
  const { goBack } = useHistory();
  function handleTry() {
    goBack();
  }

  return (
    <>
      <Box flex={1} paddingLeft={16} paddingRight={16} paddingBottom={48} backgroundColor={COLORS.PALE_BLUE}>
        <Box flex={1} />
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK} textAlign="center">
          Оплата не прошла
        </Typography>
        <Box marginTop={32} alignItems="center" justifyContent="center">
          <img src="images/error.png" className={styles.image} />
        </Box>
        <Box marginTop={28}>
          <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK} textAlign="center">
            Бывает! Попробуй ещё раз, возможно не хватает средств на карте или ещё что-то
          </Typography>
        </Box>
        <Box flex={1} />
        <Button label="Попробовать снова" onClick={handleTry} />
      </Box>
    </>
  );
});
