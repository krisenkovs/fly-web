import styles from './styles.module.css';
import { Box } from 'components';
import { COLORS } from 'constant';
import React, { ReactElement } from 'react';

type Props = {
  data: { key: number | string; content?: ReactElement }[];
  activeIndex: number;
};

export function InlineDots({ data, activeIndex }: Props) {
  return (
    <Box alignItems="center" justifyContent="center" flexDirection="row" className={styles.container}>
      {data?.map((_, index) => (
        <Box
          height={4}
          borderRadius={4}
          backgroundColor={COLORS.WHITE}
          style={{
            width: index === activeIndex ? '25px' : '4px',
          }}
          key={index}
        />
      ))}
    </Box>
  );
}
