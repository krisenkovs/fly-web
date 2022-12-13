import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import React, { FC, useContext, useRef } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';

export const ResetPasswordPage: FC = () => {
  const { values, errors, hasError, changed, validateFields, setFieldValue } = useForm({
    'password-new': {
      required: { message: 'Укажите пароль' },
    },
  });
  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFormClick() {
    validateFields().then(() => formRef?.current?.submit());
  }

  return (
    <Box flex={1}>
      <Header
        title="Востановим пароль?"
        info={
          <>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Придумай новый пароль,
            </Typography>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              на этот раз ты его не забудешь
            </Typography>
          </>
        }
      />
      <Box flex={1} paddingTop={40} paddingLeft={16} paddingRight={16} paddingBottom={58}>
        <Box flex={1} />
        <form action={theme?.url?.action} method="post" ref={formRef}>
          <FloatInput
            hint={errors['password-new']}
            value={values['password-new']}
            type="password"
            label="Пароль"
            name="password-new"
            onChange={(value) => {
              setFieldValue('password-new', value);
              setFieldValue('password-confirm', value);
            }}
          />
          <input hidden name="password-confirm" id="password-confirm" value={values['password-confirm']} />
        </form>
        <Box marginTop={24}>
          <Button onClick={handleFormClick} label="Востановить пароль" disabled={!changed || hasError} />
        </Box>
        <Box flex={1} />
      </Box>
    </Box>
  );
};
