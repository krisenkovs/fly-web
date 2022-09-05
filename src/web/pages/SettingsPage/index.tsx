import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Modal } from 'components/Modal';
import { Avatar } from 'components/Skeleton/Avatar';
import { TouchableOpacity } from 'components/TouchableOpacity';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import { Avatar1 } from 'icons';
import { observer } from 'mobx-react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { store as mainStore } from 'web/application/store';
import { Header } from 'web/components/Header';

const avatars = [Avatar1, Avatar1, Avatar1, Avatar1, Avatar1, Avatar1, Avatar1, Avatar1];

export const SettingsPage = observer(() => {
  const [visible, setVisible] = useState(false);
  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    firstName: { required: { message: 'Заполните имя' } },
    lastName: { required: { message: 'Заполните фамилию' } },
    email: { required: { message: 'Заполните email' } },
    phone: { required: { message: 'Заполните телефон' } },
    usePhotoAsAvatar: {},
    avatarCode: {},
  });
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetFields(mainStore.profilePromise?.value);
  }, [mainStore.profilePromise?.value]);

  function handleSaveClick() {
    validateFields().then((values) => mainStore.saveProfile(values));
  }

  function handleFileLoad(e: ChangeEvent<HTMLInputElement>) {
    e.target?.files?.[0] && mainStore.saveFile(e.target?.files?.[0]);
  }

  console.log(hasError, changed, errors);

  return (
    <Box flex={1} position="relative">
      <Header title="Настройки профиля" showBackButton showProfileButton={false} />
      <Box paddingTop={30} paddingLeft={16} paddingRight={16} paddingBottom={48} flex={1}>
        <Box flexDirection="row" alignItems="center" marginBottom={20}>
          {values.avatarCode === undefined && (
            <Box height={100} width={100} borderRadius={100} backgroundColor={COLORS.LIGHT_BLUE} />
          )}
          {values?.avatarCode !== undefined && (
            <Box
              height={100}
              width={100}
              borderRadius={100}
              alignItems="center"
              justifyContent="center"
              style={{ border: `1px solid var(--color-grey)` }}
            >
              <Avatar1 height={100} width={100} />
            </Box>
          )}
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
        <Button
          loading={mainStore.saveProfilePromise?.pending}
          disabled={hasError || !changed}
          onClick={handleSaveClick}
          label="Сохранить"
        />
      </Box>
      <Modal onClose={() => setVisible(false)} title="Сменить фото" visible={visible}>
        <Box marginTop={24} marginLeft={16} marginRight={16} flexDirection="row" alignItems="center">
          <Box height={100} width={100} borderRadius={100} backgroundColor={COLORS.LIGHT_BLUE} />
          <Box marginLeft={20}>
            <input type="file" ref={ref} hidden onChange={handleFileLoad} />
            <TouchableOpacity onPress={() => ref.current?.click()}>
              <Typography weight={400} size={16} lineHeight={20} color={COLORS.BLUE}>
                Загрузить фото
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
        <Box marginTop={20} marginBottom={20} marginLeft={16} marginRight={16}>
          <Typography color={COLORS.BLACK} weight={700} size={14} lineHeight={18}>
            Выбрать аватара
          </Typography>
        </Box>
        <Box marginLeft={16} marginRight={16} flexDirection="row" style={{ gap: '16px', flexWrap: 'wrap' }}>
          {avatars.map((Icon, index) => (
            <TouchableOpacity onPress={() => setFieldValue('avatarCode', index)}>
              <Box
                height={68}
                width={68}
                borderRadius={64}
                alignItems="center"
                justifyContent="center"
                style={{ border: `1px solid var(${values.avatarCode === index ? '--color-blue' : '--color-grey'})` }}
              >
                <Icon />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      </Modal>
    </Box>
  );
});
