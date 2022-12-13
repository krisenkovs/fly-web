import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import React, { FC, useContext, useRef } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';

export const ForgotPage: FC = () => {
  const { values, errors, hasError, changed, validateFields, setFieldValue } = useForm({
    username: {
      required: { message: 'Укажите email' },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'УКажите валидный email',
      },
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
        title="Забыл пароль?"
        info={
          <>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Напомни нам email
            </Typography>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              и мы вышлем тебе волшебную ссылку
            </Typography>
          </>
        }
      />
      <Box flex={1} paddingTop={40} paddingLeft={16} paddingRight={16} paddingBottom={58}>
        <Box flex={1} />
        <form action={theme?.url?.action} method="post" ref={formRef}>
          <FloatInput
            hint={errors?.username}
            value={values?.username}
            label="Email"
            name="username"
            onChange={(value) => setFieldValue('username', value)}
          />
        </form>
        <Box marginTop={16}>
          <Button onClick={handleFormClick} label="Отправить ссылку" disabled={!changed || hasError} />
        </Box>
        <Box flex={1} />
      </Box>
    </Box>
  );
};
