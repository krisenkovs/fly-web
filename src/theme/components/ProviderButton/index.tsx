import styles from './styles.module.css';
import { GoogleIcon } from 'icons/GoogleIcon';
import React, { FC, ReactElement } from 'react';

const icons: Record<string, ReactElement> = {
  google: <GoogleIcon />,
};

type Props = {
  type: keyof typeof icons;
  href?: string;
};

export const ProviderButton: FC<Props> = ({ type, href }) => {
  return (
    <a className={styles.container} href={href}>
      {icons[type]}
    </a>
  );
};
