import { COLORS } from 'constant';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
  color?: COLORS;
};

export default function FlyIcon({ width = 60, height = 60, color = COLORS.WHITE }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 18.4876C60 10.4863 53.5033 4 45.502 4C37.4893 4 30.9833 10.4956 30.9833 18.5083V32.9752H45.5124C53.5137 32.9752 60 26.4889 60 18.4876Z"
        fill={`var(--color-${color})`}
      />
      <path
        d="M7 46C7 52.0751 11.9249 57 18 57C24.0751 57 29 52.0751 29 46L29 35L18 35C11.9249 35 7 39.9249 7 46Z"
        fill={`var(--color-${color})`}
      />
      <path
        d="M53 46C53 52.0751 48.0751 57 42 57C35.9249 57 31 52.0751 31 46L31 42.4556L36.5 35L42 35C48.0751 35 53 39.9249 53 46Z"
        fill={`var(--color-${color})`}
      />
      <path
        d="M0 18.4876C0 10.4863 6.49667 4 14.498 4C22.5107 4 29.0166 10.4956 29.0166 18.5083V26.5765L24.1805 32.9752H14.4876C6.48633 32.9752 0 26.4889 0 18.4876Z"
        fill={`var(--color-${color})`}
      />
    </svg>
  );
}
