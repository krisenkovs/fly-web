import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';
import { ProfileType } from 'web/types';

export const SettingsPage = observer(() => {
  const [formValues, setFormValues] = useState<ProfileType | undefined>(undefined);

  useEffect(() => {
    setFormValues(mainStore.profilePromise?.value);
  }, [mainStore.profilePromise?.value]);

  function handleSaveClick() {
    mainStore.saveProfile(formValues);
  }

  function handleEditField(key: keyof ProfileType, value: string | number | undefined) {
    setFormValues((prevState) => ({ ...prevState, [key]: value }));
  }

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
        <FloatInput
          label="Имя"
          type="text"
          value={formValues?.firstName}
          onChange={(value) => handleEditField('firstName', value)}
        />
        <FloatInput
          label="Фамилия"
          type="text"
          value={formValues?.lastName}
          onChange={(value) => handleEditField('lastName', value)}
        />
        <FloatInput
          label="Email"
          type="text"
          value={formValues?.email}
          onChange={(value) => handleEditField('email', value)}
        />
        <FloatInput
          label="телефон"
          type="text"
          value={formValues?.phone}
          onChange={(value) => handleEditField('phone', value)}
        />
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
        <Button loading={mainStore.saveProfilePromise?.pending} onClick={handleSaveClick} label="Сохранить" />
      </Box>
    </Box>
  );
});
