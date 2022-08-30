import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function CoinIcon({ width = 24, height = 24, color = COLORS.LIGHT_BLACK }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 14.25C17.3848 14.25 21.75 12.2353 21.75 9.75C21.75 7.26472 17.3848 5.25 12 5.25C6.61522 5.25 2.25 7.26472 2.25 9.75C2.25 12.2353 6.61522 14.25 12 14.25Z"
        stroke={`var(--color-${color}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.25V18.75"
        stroke={`var(--color-${color}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 9.75V14.25C2.25 16.5 6 18.75 12 18.75C18 18.75 21.75 16.5 21.75 14.25V9.75"
        stroke={`var(--color-${color}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 13.3219V17.8219"
        stroke={`var(--color-${color}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 13.3219V17.8219"
        stroke={`var(--color-${color}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
