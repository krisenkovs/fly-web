import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React from 'react';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';

export const SettingsPage = observer(() => {
  return (
    <Box flex={1}>
      <Header title="Настройки профиля" showBackButton showProfileButton={false} />
      <Box paddingTop={30} paddingLeft={16} paddingRight={16} paddingBottom={48} flex={1}>
        <Box flexDirection="row" alignItems="center" marginBottom={20}>
          <Box height={100} width={100} borderRadius={100} backgroundColor={COLORS.LIGHT_BLUE} />
          <Box marginLeft={20}>
            <TouchableOpacity>
              <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
                Поменять фото
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
        <FloatInput label="Имя" type="text" value={mainStore?.profilePromise?.value?.firstName} />
        <FloatInput label="Фамилия" type="text" value={mainStore?.profilePromise?.value?.lastName} />
        <FloatInput label="Email" type="text" value={mainStore?.profilePromise?.value?.email} />
        <FloatInput label="телефон" type="text" value={mainStore?.profilePromise?.value?.phone} />
        <Box paddingBottom={28}>
          <TouchableOpacity>
            <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
              Изменить пароль
            </Typography>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity>
          <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
            Удалить аккаунт
          </Typography>
        </TouchableOpacity>
        <Box flex={1} />
        <Button onClick={() => null} label="Сохранить" disabled />
      </Box>
    </Box>
  );
});
