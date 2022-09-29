import styles from './styles.module.css';
import { Box } from 'components/Box';
import { COLORS } from 'constant';
import React, { FC } from 'react';
import { API } from 'web/constant';

type Props = {
  avatarCode?: number;
  photoId?: string;
  size: number;
};

export function AvatarView({ photoId, avatarCode, size = 100 }: Props) {
  if (photoId) {
    return (
      <Box
        height={size}
        width={size}
        borderRadius={size}
        alignItems="center"
        justifyContent="center"
        backgroundColor={COLORS.WHITE}
        className={styles.content}
        overflow="hidden"
      >
        <img src={`${API.IMAGE}/${photoId}`} alt="" className={styles.image} />
      </Box>
    );
  }

  if (avatarCode !== undefined) {

    return (
      <Box
        height={size}
        width={size}
        borderRadius={size}
        alignItems="center"
        justifyContent="center"
        backgroundColor={COLORS.WHITE}
        overflow="hidden"
      >
        <img src={`images/Avatar${avatarCode}.png`} alt={`Avatar${avatarCode}`} className={styles.image} />
      </Box>
    );
  }

  return (
    <Box
      height={size}
      width={size}
      borderRadius={size}
      alignItems="center"
      justifyContent="center"
      backgroundColor={COLORS.PALE_BLUE}
      className={styles.content}
    />
  );
}
