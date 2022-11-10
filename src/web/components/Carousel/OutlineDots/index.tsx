import styles from './styles.module.css';
import { Box } from 'components';
import { COLORS } from 'constant';
import React, { ReactElement } from 'react';

type Props = {
  data: { key: number | string; content?: ReactElement }[];
  activeIndex: number;
};

export function OutlineDots({ data, activeIndex }: Props) {
  return (
    <Box
      className={styles.container}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height={8}
      marginTop={16}
    >
      {data?.map((_, index) => (
        <Box
          width={8}
          height={8}
          borderRadius={8}
          backgroundColor={index === activeIndex ? COLORS.BLUE : COLORS.PALE_BLUE}
          key={index}
        />
      ))}
    </Box>
  );
}
