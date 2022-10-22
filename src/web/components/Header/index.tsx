import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { UserIcon, BackIcon } from 'icons';
import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'web/constant';

type Props = {
  title?: string;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  height?: number;
  onBackClick?: () => void;
  style?: CSSProperties;
  className?: string;
};

export function Header({
  title,
  showBackButton,
  className,
  showProfileButton = true,
  height = 56,
  style,
  onBackClick,
}: Props) {
  const { push, goBack } = useHistory();

  function handleProfilePress() {
    push(ROUTES.PROFILE);
  }

  function handleBackPress() {
    onBackClick ? onBackClick() : goBack();
  }

  return (
    <Box
      height={height}
      backgroundColor={COLORS.LIGHT_BLUE}
      paddingLeft={28}
      paddingRight={28}
      borderBottomRightRadius={12}
      borderBottomLeftRadius={12}
      flexDirection="column"
      paddingTop={12}
      className={className}
      style={{ ...style, boxSizing: 'border-box', zIndex: 1 }}
    >
      <Box flexDirection="row" alignItems="center">
        {showBackButton && (
          <Box marginRight={28}>
            <TouchableOpacity onPress={handleBackPress}>
              <Box height={32} width={32} alignItems="center" justifyContent="center" borderRadius={16}>
                <BackIcon />
              </Box>
            </TouchableOpacity>
          </Box>
        )}
        <Typography weight={800} size={20} lineHeight={24} color={COLORS.BLACK} flex={1}>
          {title}
        </Typography>
        {showProfileButton && (
          <TouchableOpacity onPress={handleProfilePress}>
            <UserIcon />
          </TouchableOpacity>
        )}
      </Box>
      <Box flex={1} />
    </Box>
  );
}
