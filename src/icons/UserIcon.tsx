import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function UserIcon({ color = COLORS.BLACK }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 21C4 18.2386 7.58172 16 12 16C16.4183 16 20 18.2386 20 21"
        stroke={`var(--color-${color}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
        stroke={`var(--color-${color}`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
