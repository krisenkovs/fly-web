import {Box} from 'components/Box';
import {Typography} from 'components/Typography';
import {COLORS} from "constant";
import React, {FC, ReactNode} from 'react';
import {Logo} from './Logo';
import styles from './styles.module.css';

type Props = {
  title?: string;
  info?: ReactNode;
};

export const Header: FC<Props> = ({ title, info }) => {
  return (
    <Box className={styles.container} paddingTop={44} paddingBottom={44} paddingLeft={44} paddingRight={44}>
      <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK}>
        {title}
      </Typography>
      <Box marginTop={16}>
        {info}
      </Box>
      <div className={styles.logo}>
        <Logo />
      </div>
    </Box>
  );
};
