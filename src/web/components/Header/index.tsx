import { Box } from 'components/Box';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { UserIcon, BackIcon } from 'icons';
import React from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from 'web/constant';

type Props = {
  title?: string;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  height?: number;
};

export function Header({ title, showBackButton, showProfileButton = true, height = 56 }: Props) {
  const navigation = useNavigate();

  function handleProfilePress() {
    navigation(ROUTES.PROFILE);
  }

  function handleBackPress() {
    navigation(-1);
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
      style={{ boxSizing: 'border-box' }}
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
