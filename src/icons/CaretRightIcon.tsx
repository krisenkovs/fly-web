import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function CaretRightIcon({ width = 24, height = 24, color = COLORS.BLACK }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M10.7071 6.29289C10.3166 5.90237 9.68342 5.90237 9.29289 6.29289C8.90237 6.68342 8.90237 7.31658 9.29289 7.70711L10.7071 6.29289ZM15 12L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L15 12ZM9.29289 16.2929C8.90237 16.6834 8.90237 17.3166 9.29289 17.7071C9.68342 18.0976 10.3166 18.0976 10.7071 17.7071L9.29289 16.2929ZM9.29289 7.70711L14.2929 12.7071L15.7071 11.2929L10.7071 6.29289L9.29289 7.70711ZM14.2929 11.2929L9.29289 16.2929L10.7071 17.7071L15.7071 12.7071L14.2929 11.2929Z"
        fill={`var(--color-${color}`}
      />
    </svg>
  );
}
