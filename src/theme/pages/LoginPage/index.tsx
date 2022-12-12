import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import React, { FC, useContext, useEffect, useRef } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';
import { ProviderButton } from 'theme/components/ProviderButton';

export const LoginPage: FC = () => {
  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    password: {
      required: { message: 'Укажите пароль' },
    },
    username: {
      required: { message: 'Укажите email' },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Укажите валидный email',
      },
    },
  });

  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    resetFields();
  }, []);

  function handleLoginClick() {
    validateFields().then(() => formRef?.current?.submit());
  }

  return (
    <Box flex={1}>
      <Header
        title="С возвращением!"
        info={
          <>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Мы тебя очень ждали!
            </Typography>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Рады снова тебя видеть
            </Typography>
          </>
        }
      />
      <Box flex={1} paddingTop={24} paddingLeft={16} paddingRight={16} paddingBottom={40}>
        <form action={theme?.url?.action} method="post" ref={formRef}>
          <FloatInput
            hint={errors?.username}
            value={values?.username}
            label="Email или телефон"
            name="username"
            onChange={(value) => setFieldValue('username', value)}
          />
          <Box marginTop={8}>
            <FloatInput
              hint={errors?.password}
              value={values?.password}
              label="Пароль"
              name="password"
              onChange={(value) => setFieldValue('password', value)}
              type="password"
            />
          </Box>
        </form>
        <Box flexDirection="row" justifyContent="end">
          <Link weight={400} size={16} height={24} href={theme?.url?.resetPassword}>
            Забыли пароль?
          </Link>
        </Box>
        <Box marginTop={16}>
          <Button onClick={handleLoginClick} label="Войти" disabled={hasError || !changed} />
        </Box>
        <Box flex={1} />
        {theme?.url?.social?.['Google'] && (
          <>
            <Typography weight={500} size={16} lineHeight={20} textAlign="center" color={COLORS.BLACK}>
              Или через соц сети
            </Typography>
            <Box marginTop={16} justifyContent="center" alignItems="center" marginBottom={24}>
              <ProviderButton type="google" href={theme?.url?.social['Google']} />
            </Box>
          </>
        )}

        <Box flexDirection="row" justifyContent="center">
          <Link weight={700} size={16} height={24} href={theme?.url?.registration}>
            Зарегистрироваться
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
