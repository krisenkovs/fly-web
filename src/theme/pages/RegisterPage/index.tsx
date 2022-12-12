import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';
import { ProviderButton } from 'theme/components/ProviderButton';

export const RegisterPage: FC = () => {
  const [step, setStep] = useState(1);
  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
    password: {
      required: { message: 'Укажите пароль' },
    },
    firstName: {
      required: { message: 'Укажите имя' },
      pattern: {
        value: /^[a-zA-Zа-яА-Я-]{3,}$/,
        message: 'Укажите корректное имя',
      },
    },
    lastName: {
      required: { message: 'Укажите фамилию' },
      pattern: {
        value: /^[a-zA-Zа-яА-Я-]{3,}$/,
        message: 'Укажите корректную фамилию',
      },
    },
    phoneNumber: {
      required: { message: 'Укажите телефон' },
      pattern: {
        value: /^\+?375(29|33|44|25)[0-9]{7}$/,
        message: 'Укажите корректный телефон',
      },
    },
    email: {
      required: { message: 'Укажите email' },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'УКажите валидный email',
      },
    },
  });

  useEffect(() => {
    resetFields();
  }, []);

  function handleLoginClick() {
    validateFields().then(() => formRef?.current?.submit());
  }

  function handleNextClick() {
    setStep(2);
  }

  return (
    <Box flex={1}>
      <Header
        title={step === 1 ? 'Добро пожаловать!' : 'Давайте познакомимся'}
        info={
          step === 1 ? (
            <>
              <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
                Давайте зарегистрируемся,
              </Typography>
              <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
                а потом заряжаться
              </Typography>
            </>
          ) : (
            <>
              <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
                Мы зовём себя Battery Fly
              </Typography>
              <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
                Как зовут тебя?
              </Typography>
            </>
          )
        }
      />
      <Box flex={1} paddingTop={24} paddingLeft={16} paddingRight={16} paddingBottom={40}>
        <form action={theme?.url?.action} method="post" ref={formRef}>
          {step === 2 && (
            <>
              <FloatInput
                hint={errors?.firstName}
                value={values?.firstName}
                label="Имя"
                name="firstName"
                onChange={(value) => setFieldValue('firstName', value)}
              />
              <Box marginTop={8}>
                <FloatInput
                  hint={errors?.lastName}
                  value={values?.lastName}
                  label="Фамилия"
                  name="lastName"
                  onChange={(value) => setFieldValue('lastName', value)}
                />
              </Box>
              <input hidden name="email" id="email" value={values?.email} />
              <input
                hidden
                name="user.attributes.phoneNumber"
                id="user.attributes.phoneNumber"
                value={values?.phoneNumber}
              />
              <input hidden name="password" id="password" value={values?.password} />
            </>
          )}
          {step === 1 && (
            <>
              <Box marginTop={8}>
                <FloatInput
                  hint={errors?.email}
                  value={values?.email}
                  label="Email"
                  name="email"
                  onChange={(value) => setFieldValue('email', value)}
                />
              </Box>
              <Box marginTop={8}>
                <FloatInput
                  hint={errors?.phoneNumber}
                  value={values?.phoneNumber}
                  type="phone"
                  label="Телефон"
                  name="user.attributes.phoneNumber"
                  onChange={(value) => setFieldValue('phoneNumber', value?.replace('+', ''))}
                />
              </Box>
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
            </>
          )}

          <input hidden name="password-confirm" id="password-confirm" value={values?.password} />
        </form>

        {step === 1 ? (
          <Box marginTop={24} marginBottom={24}>
            <Button
              onClick={handleNextClick}
              label="Далее"
              disabled={
                !values?.email ||
                !values.password ||
                !values.phoneNumber ||
                !!errors?.password ||
                !!errors?.email ||
                !!errors.phoneNumber ||
                !changed
              }
            />
          </Box>
        ) : (
          <Box marginTop={24}>
            <Button onClick={handleLoginClick} label="Закончить регистрацию" disabled={hasError || !changed} />
          </Box>
        )}
        <Box flex={1} />
        {step === 1 && theme?.url?.social?.['Google'] && (
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
          <Link weight={700} size={16} height={24} href={theme?.url?.login}>
            Войти в аккаунт
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
