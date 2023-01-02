import React, { CSSProperties, FC } from 'react';

type Props = {
  style?: CSSProperties;
};

export const EyeIcon: FC<Props> = ({ style }) => {
  return (
    <span style={style}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 12C2 12 5.63636 6 12 6C18.3636 6 22 12 22 12C22 12 18.3636 18 12 18C5.63636 18 2 12 2 12Z"
          stroke="#2C2E31"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="#2C2E31"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};
