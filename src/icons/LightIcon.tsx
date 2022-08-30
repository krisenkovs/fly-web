import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function LightIcon({ width = 24, height = 24, color = COLORS.LIGHT_BLACK }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M12.8889 2L4 14H12L11.1111 22L20 10H12L12.8889 2Z"
        stroke={`var(--color-${color}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
