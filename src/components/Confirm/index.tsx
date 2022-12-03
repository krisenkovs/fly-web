import styles from './styles.module.css';
import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  visible?: boolean;
  onClose: () => void;
  onOk?: () => void;
}>;

export function Confirm({ visible, children, onClose, onOk }: Props) {
  if (!visible) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} />
      <Box position="absolute" className={styles.container} alignItems="center" justifyContent="center">
        <Box backgroundColor={COLORS.WHITE} borderRadius={12} className={styles.content}>
          <Box overflow="hidden" paddingTop={16} paddingBottom={8} paddingLeft={16} paddingRight={16}>
            {children}
          </Box>
          <Box
            paddingTop={8}
            paddingBottom={16}
            paddingLeft={16}
            paddingRight={16}
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
          >
            <TouchableOpacity onPress={onClose}>
              <Typography color={COLORS.BLACK} weight={600} size={14} lineHeight={18}>
                Отмена
              </Typography>
            </TouchableOpacity>
            <Box marginLeft={16}>
              <TouchableOpacity onPress={onOk}>
                <Typography color={COLORS.BLUE} weight={600} size={14} lineHeight={18}>
                  Да
                </Typography>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
