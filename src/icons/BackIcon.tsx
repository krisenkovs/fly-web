import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function BackIcon({ width = 10, height = 16, color = COLORS.BLACK }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 10 16" fill="none">
      <path
        d="M8.61339 0.946671C8.09339 0.426671 7.25339 0.426671 6.73339 0.946671L0.613389 7.06667C0.0933887 7.58667 0.0933887 8.42667 0.613389 8.94667L6.73339 15.0667C7.25339 15.5867 8.09339 15.5867 8.61339 15.0667C9.13339 14.5467 9.13339 13.7067 8.61339 13.1867L3.44006 8L8.61339 2.82667C9.13339 2.30667 9.12006 1.45334 8.61339 0.946671Z"
        fill={`var(--color-${color}`}
      />
    </svg>
  );
}
