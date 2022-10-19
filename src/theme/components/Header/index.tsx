import { Logo } from './Logo';
import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React, { FC, ReactNode } from 'react';

type Props = {
  title?: string | React.ReactElement;
  info?: ReactNode;
};

export const Header: FC<Props> = ({ title, info }) => {
  return (
    <Box
      className={styles.container}
      paddingTop={44}
      paddingBottom={44}
      paddingLeft={44}
      paddingRight={100}
      height={180}
    >
      <Box className={styles.title}>
        <Typography weight={800} size={24} lineHeight={30} color={COLORS.BLACK}>
          {title}
        </Typography>
        <Box marginTop={16}>{info}</Box>
      </Box>
      <div className={styles.logo}>
        <Logo />
      </div>
    </Box>
  );
};
