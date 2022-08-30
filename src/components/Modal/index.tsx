import { COLORS } from 'constant';
import { CrossIcon } from 'icons';
import React, { PropsWithChildren } from 'react';

import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';

import styles from './styles.module.css';

type Props = PropsWithChildren<{
  visible?: boolean;
  title?: string;
  onClose: () => void;
}>;

export function Modal({ title, visible, children, onClose }: Props) {
  return visible ? (
    <>
      <Box backgroundColor={COLORS.BLACK} className={styles.overlay} />
      <Box
        backgroundColor={COLORS.WHITE}
        className={styles.content}
        paddingTop={24}
        paddingBottom={24}
        paddingLeft={24}
        paddingRight={24}
      >
        <Box flexDirection="row" alignItems="center">
          <Box flex={1}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              {title}
            </Typography>
          </Box>
          <TouchableOpacity onPress={onClose}>
            <Box
              height={32}
              width={32}
              borderRadius={16}
              justifyContent="center"
              alignItems="center"
              backgroundColor={COLORS.PALE_BLUE}
            >
              <CrossIcon width={20} height={20} color={COLORS.BLUE} />
            </Box>
          </TouchableOpacity>
        </Box>
        <Box>{children}</Box>
      </Box>
    </>
  ) : null;
}
