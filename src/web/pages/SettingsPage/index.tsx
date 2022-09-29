import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { store  } from 'web/application/store';
import { AvatarView } from 'web/components/AvatarView';
import { Header } from 'web/components/Header';
import { PasswordModal } from 'web/pages/SettingsPage/PasswordModal';
import { PhotoModal } from 'web/pages/SettingsPage/PhotoModal';

export const SettingsPage = observer(() => {
  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    firstName: { required: { message: 'Заполните имя' } },
    lastName: { required: { message: 'Заполните фамилию' } },
    email: { required: { message: 'Заполните email' } },
    phone: { required: { message: 'Заполните телефон' } },
    usePhotoAsAvatar: {},
    avatarCode: {},
    photoId: {},
  });

  useEffect(() => {
    resetFields(store.profilePromise?.value);
  }, [store.profilePromise?.value]);

  function handleAvatarChange(index?: number) {
    setFieldValue('usePhotoAsAvatar', false);
    setFieldValue('avatarCode', index);
    setFieldValue('photoId', undefined);
  }

  function handlePhotoChange(photoId?: string) {
    setFieldValue('usePhotoAsAvatar', true);
    setFieldValue('photoId', photoId);
    setFieldValue('avatarCode', undefined);
  }

  function handleSaveClick() {
    validateFields().then((values) => store.saveProfile(values));
  }

  return (
    <Box flex={1} position="relative">
      <Header title="Настройки профиля" showBackButton showProfileButton={false} />
      <Box paddingTop={30} paddingLeft={16} paddingRight={16} paddingBottom={48} flex={1}>
        <Box flexDirection="row" alignItems="center" marginBottom={20}>
          <AvatarView size={100} avatarCode={values?.avatarCode} photoId={values?.photoId} />
          <Box marginLeft={20}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
                Поменять фото
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
        <FloatInput
          label="Имя"
          type="text"
          value={values?.firstName}
          hint={errors?.firstName}
          onChange={(value) => setFieldValue('firstName', value)}
        />
        <FloatInput
          label="Фамилия"
          type="text"
          value={values?.lastName}
          hint={errors?.lastName}
          onChange={(value) => setFieldValue('lastName', value)}
        />
        <FloatInput
          label="Email"
          type="text"
          value={values?.email}
          hint={errors?.email}
          onChange={(value) => setFieldValue('email', value)}
        />
        <FloatInput
          label="телефон"
          type="text"
          value={values?.phone}
          hint={errors?.phone}
          onChange={(value) => setFieldValue('phone', value)}
        />
        <Box paddingBottom={28}>
          <TouchableOpacity onPress={() => setVisiblePassword(true)}>
            <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
              Изменить пароль
            </Typography>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity disabled>
          <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
            Удалить аккаунт
          </Typography>
        </TouchableOpacity>
        <Box flex={1} />
        <Button
          loading={store.saveProfilePromise?.pending}
          disabled={hasError || !changed}
          onClick={handleSaveClick}
          label="Сохранить"
        />
      </Box>
      <PhotoModal
        visible={visible}
        onClose={() => setVisible(false)}
        avatarCode={values?.avatarCode}
        photoId={values?.photoId}
        onChangePhoto={handlePhotoChange}
        onChangeAvatar={handleAvatarChange}
      />
      <PasswordModal visible={visiblePassword} onClose={() => setVisiblePassword(false)} />
    </Box>
  );
});
