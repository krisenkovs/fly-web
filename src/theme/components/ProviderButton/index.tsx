import { GoogleIcon } from 'icons/GoogleIcon';
import React, { FC, ReactElement } from 'react';

import styles from './styles.module.css';

const icons: Record<string, ReactElement> = {
  google: <GoogleIcon />,
};

type Props = {
  type: keyof typeof icons;
  href?: string;
};

export const ProviderButton: FC<Props> = ({ type }) => {
  return <div className={styles.container}>{icons[type]}</div>;
};
