import styles from './styles.module.css';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { CrossIcon } from 'icons';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

type Props = PropsWithChildren<{
  visible?: boolean;
  title?: string;
  onClose: () => void;
}>;

export function Modal({ title, visible, children, onClose }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
    }
  }, [visible]);

  function handleClose() {
    setShow(false);
    setTimeout(() => {
      onClose?.();
    }, 150);
  }

  const overlayStyle = useMemo(() => {
    return { opacity: show ? 0.1 : 0 };
  }, [show]);

  const contentStyle = useMemo(() => {
    return { transform: show ? 'translateY(0)' : 'translateY(100%)' };
  }, [show]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} style={overlayStyle} />
      <Box
        backgroundColor={COLORS.WHITE}
        className={styles.content}
        paddingTop={24}
        paddingBottom={24}
        paddingLeft={24}
        paddingRight={24}
        style={contentStyle}
      >
        <Box flexDirection="row" alignItems="center">
          <Box flex={1}>
            <Typography color={COLORS.BLACK} weight={700} size={16} lineHeight={20}>
              {title}
            </Typography>
          </Box>
          <TouchableOpacity onPress={handleClose}>
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
        <Box overflow="hidden">{children}</Box>
      </Box>
    </>
  );
}
