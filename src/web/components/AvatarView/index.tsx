import { Box } from 'components/Box';
import { COLORS } from 'constant';
import { Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8 } from 'icons';
import React, { FC } from 'react';

type Props = {
  avatarCode?: number;
  photoId?: string;
  size: number;
};

const avatars: FC[] = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8];

export function AvatarView({ photoId, avatarCode, size = 100 }: Props) {
  if (photoId) {
    return <Box height={size} width={size} borderRadius={size} backgroundColor={COLORS.LIGHT_BLUE} />;
  }

  if (avatarCode !== undefined) {
    const Icon = avatars[avatarCode] as typeof Avatar1;

    return (
      <Box
        height={size}
        width={size}
        borderRadius={size}
        alignItems="center"
        justifyContent="center"
        backgroundColor={COLORS.WHITE}
      >
        <Icon width={size} height={size} />
      </Box>
    );
  }

  return null;
}
