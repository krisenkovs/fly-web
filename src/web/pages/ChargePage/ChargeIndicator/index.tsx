import styles from './styles.module.css';
import { Box } from 'components/Box';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { LightIcon } from 'icons';
import React from 'react';

type Props = {
  time?: number;
  color: COLORS;
  percent?: number;
};

export const ChargeIndicator = ({ color, time, percent }: Props) => {
  return (
    <Box
      height={260}
      width={260}
      borderRadius={130}
      backgroundColor={COLORS.WHITE}
      paddingTop={10}
      paddingLeft={10}
      paddingRight={10}
      paddingBottom={10}
      style={{ position: 'relative', boxSizing: 'border-box' }}
    >
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
        <circle
          cx="120"
          cy="120"
          r="118.5"
          transform="rotate(-90 120 120)"
          stroke="url(#paint0_linear_14_202)"
          strokeWidth="3"
        />
        <defs>
          <linearGradient
            id="paint0_linear_14_202"
            x1="120"
            y1="7.62939e-06"
            x2="120"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D2E4FF" />
            <stop offset="1" stopColor={color} />
          </linearGradient>
        </defs>
      </svg>

      <svg width={200} height={200} className={styles.diagram}>
        <circle
          cx="100"
          cy="100"
          r="94"
          stroke="var(--color-pale-blue)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx="100"
          cy="100"
          r="94"
          stroke={`var(--color-${color})`}
          strokeWidth="12"
          strokeDasharray="314,2000 "
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <Box
        width={176}
        height={176}
        borderRadius={88}
        className={styles.content}
        justifyContent="center"
        alignItems="center"
      >
        <LightIcon width={24} height={24} color={color} />
        <Box marginTop={12}>
          <Typography color={COLORS.BLACK} weight={800} size={48} lineHeight={48}>
            {`${percent}%`}
          </Typography>
        </Box>
        <Box marginTop={12}>
          <Typography color={COLORS.LIGHT_BLACK} weight={600} size={18} lineHeight={24}>
            {`${time} мин`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
