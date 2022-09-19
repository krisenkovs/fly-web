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
    pass: {
      required: { message: 'Укажите пароль' },
      dependence: ['passwordConfirm'],
    },
    passConf: {
      required: { message: 'Укажите пароль' },
      validator: (fieldValue: string, fieldValues) => {
        if (fieldValue !== fieldValues?.pass) {
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
    validateFields().then((values) =>
      mainStore.changePassword({ pass: values?.pass?.split(''), passConf: values?.passConf?.split('') }),
    );
  }
  return (
    <Modal onClose={onClose} title="Сменить фото" visible={visible}>
      <Box marginTop={8} marginBottom={16}>
        <FloatInput
          label="Новый пароль"
          type="password"
          value={values?.pass}
          hint={errors?.pass}
          onChange={(value) => setFieldValue('pass', value)}
        />
        <FloatInput
          label="Повторите новый пароль"
          type="password"
          value={values?.passConf}
          hint={errors?.passConf}
          onChange={(value) => setFieldValue('passConf', value)}
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
