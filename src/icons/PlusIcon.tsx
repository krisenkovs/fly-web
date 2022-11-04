import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function PlusIcon({ width = 24, height = 24, color = COLORS.BLUE }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.4852 13C21.0375 13 21.4852 12.5523 21.4852 12C21.4852 11.4477 21.0375 11 20.4852 11V13ZM3.51471 11C2.96242 11 2.51471 11.4477 2.51471 12C2.51471 12.5523 2.96242 13 3.51471 13V11ZM20.4852 11L3.51471 11V13L20.4852 13V11Z"
        fill={`var(--color-${color})`}
      />
      <path
        d="M13 3.51469C13 2.96241 12.5523 2.51469 12 2.51469C11.4477 2.51469 11 2.96241 11 3.51469L13 3.51469ZM11 20.4853C11 21.0376 11.4477 21.4853 12 21.4853C12.5523 21.4853 13 21.0376 13 20.4853L11 20.4853ZM11 3.51469V20.4853L13 20.4853V3.51469L11 3.51469Z"
        fill={`var(--color-${color})`}
      />
    </svg>
  );
}
