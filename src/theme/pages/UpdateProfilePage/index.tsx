import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import { useForm } from 'hooks/useForm';
import React, { FC, useContext, useEffect, useRef } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';

export const UpdateProfilePage: FC = () => {
  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  const { values, errors, hasError, changed, validateFields, setFieldValue, resetFields } = useForm({
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
    resetFields(theme?.fields);
  }, [theme?.fields]);

  function handleFormClick() {
    validateFields().then(() => formRef?.current?.submit());
  }

  return (
    <Box flex={1}>
      <Header
        title="Давайте познакомимся"
        info={
          <>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Мы зовём себя Battery Fly
            </Typography>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Как зовут тебя?
            </Typography>
          </>
        }
      />
      <Box flex={1} paddingTop={24} paddingLeft={16} paddingRight={16} paddingBottom={40}>
        <form action={theme?.url?.action} method="post" ref={formRef}>
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
          <Box marginTop={8}>
            <FloatInput
              hint={errors?.email}
              value={values?.email}
              label="Email"
              name="email"
              readonly
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
        </form>

        <Box marginTop={24}>
          <Button onClick={handleFormClick} label="Закончить регистрацию" disabled={hasError || !changed} />
        </Box>
      </Box>
    </Box>
  );
};
