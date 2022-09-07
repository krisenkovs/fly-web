import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Modal } from 'components/Modal';
import { useForm } from 'hooks/useForm';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { store as mainStore } from 'web/application/store';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const PasswordModal = observer(({ visible, onClose }: Props) => {
  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    password: {
      required: { message: 'Укажите пароль' },
      dependence: ['passwordConfirm'],
    },
    passwordConfirm: {
      required: { message: 'Укажите пароль' },
      validator: (fieldValue: string, fieldValues) => {

        if (fieldValue !== fieldValues?.password) {
          return 'Пароли должны совпадать';
        }
      },
    },
  });

  useEffect(() => {
    if (mainStore.changePasswordPromise?.fulfilled) {
      onClose();
    }
  }, [mainStore?.changePasswordPromise?.fulfilled]);

  useEffect(() => {
    resetFields({});
  }, [visible]);

  function handleChange() {
    validateFields().then((values) => mainStore.changePassword());
  }
  return (
    <Modal onClose={onClose} title="Сменить фото" visible={visible}>
      <Box marginTop={8} marginBottom={16}>
        <FloatInput
          label="Новый пароль"
          type="password"
          value={values?.password}
          hint={errors?.password}
          onChange={(value) => setFieldValue('password', value)}
        />
        <FloatInput
          label="Повторите новй пароль"
          type="password"
          value={values?.passwordConfirm}
          hint={errors?.passwordConfirm}
          onChange={(value) => setFieldValue('passwordConfirm', value)}
        />
        <Box marginTop={30}>
          <Button
            onClick={handleChange}
            disabled={!changed || hasError}
            label="Изменить"
            loading={mainStore.changePasswordPromise?.pending}
          />
        </Box>
      </Box>
    </Modal>
  );
});
