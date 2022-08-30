import { COLORS } from 'constant';
import React, { FC, useContext, useRef, useState } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';
import { ProviderButton } from 'theme/components/ProviderButton';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';

export const RegisterPage: FC = () => {
  const [formValues, setFormValues] = useState<{
    email?: string;
    password?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
  }>({});
  const [formErrors] = useState<{
    email?: string;
    password?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
  }>({});
  const [step, setStep] = useState(1);
  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  function handleEmailChange(email?: string) {
    setFormValues((prevValue) => ({ ...prevValue, email }));
  }

  function handleFirstNameChange(firstName?: string) {
    setFormValues((prevValue) => ({ ...prevValue, firstName }));
  }

  function handleLastNameChange(lastName?: string) {
    setFormValues((prevValue) => ({ ...prevValue, lastName }));
  }

  function handlePhoneNumberChange(phoneNumber?: string) {
    setFormValues((prevValue) => ({ ...prevValue, phoneNumber }));
  }

  function handlePasswordChange(password?: string) {
    setFormValues((prevValue) => ({ ...prevValue, password }));
  }

  function handleLoginClick() {
    formRef?.current?.submit();
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
      <Box flex={1} paddingTop={40} paddingLeft={16} paddingRight={16} paddingBottom={58}>
        <form action={theme?.url?.action} method="post" ref={formRef}>
          {step === 2 && (
            <>
              <FloatInput
                hint={formErrors?.firstName}
                value={formValues?.firstName}
                label="Имя"
                name="firstName"
                onChange={handleFirstNameChange}
              />
              <Box marginTop={8}>
                <FloatInput
                  hint={formErrors?.lastName}
                  value={formValues?.lastName}
                  label="Фамилия"
                  name="lastName"
                  onChange={handleLastNameChange}
                />
              </Box>
              <input hidden name="email" id="email" value={formValues?.email} />
              <input
                hidden
                name="user.attributes.phoneNumber"
                id="user.attributes.phoneNumber"
                value={formValues?.phoneNumber}
              />
              <input hidden name="password" id="password" value={formValues?.password} />
            </>
          )}
          {step === 1 && (
            <>
              <Box marginTop={8}>
                <FloatInput
                  hint={formErrors?.email}
                  value={formValues?.email}
                  label="Email"
                  name="email"
                  onChange={handleEmailChange}
                />
              </Box>
              <Box marginTop={8}>
                <FloatInput
                  hint={formErrors?.phoneNumber}
                  value={formValues?.phoneNumber}
                  label="Телефон"
                  name="user.attributes.phoneNumber"
                  onChange={handlePhoneNumberChange}
                />
              </Box>
              <Box marginTop={8}>
                <FloatInput
                  hint={formErrors?.password}
                  value={formValues?.password}
                  label="Пароль"
                  name="password"
                  onChange={handlePasswordChange}
                  type="password"
                />
              </Box>
            </>
          )}

          <input hidden name="password-confirm" id="password-confirm" value={formValues?.password} />
        </form>

        {step === 1 ? (
          <Box marginTop={24} marginBottom={24}>
            <Button
              onClick={handleNextClick}
              label="Далее"
              disabled={
                !formValues?.email ||
                !formValues.password ||
                !formValues.phoneNumber ||
                !!formErrors?.password ||
                !!formErrors?.email ||
                !!formErrors.phoneNumber
              }
            />
          </Box>
        ) : (
          <Box marginTop={24}>
            <Button
              onClick={handleLoginClick}
              label="Закончить регистрацию"
              disabled={
                !formValues.firstName || !formValues.lastName || !!formErrors.firstName || !!formErrors.lastName
              }
            />
          </Box>
        )}
        {step === 1 && (
          <>
            <Box flex={1} />
            <Typography weight={500} size={16} lineHeight={20} textAlign="center" color={COLORS.BLACK}>
              Или через соц сети
            </Typography>
            <Box marginTop={24} justifyContent="center" alignItems="center" marginBottom={32}>
              <ProviderButton type="google" href="#" />
            </Box>

            <Box flexDirection="row" justifyContent="center">
              <Link weight={700} size={16} height={24} href={theme?.url?.login}>
                Войти в аккаунт
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
