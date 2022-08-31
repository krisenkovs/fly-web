import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Link } from 'components/Link';
import { Typography } from 'components/Typography';
import { COLORS } from 'constant';
import React, { FC, useContext, useRef, useState } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';
import { ProviderButton } from 'theme/components/ProviderButton';

export const LoginPage: FC = () => {
  const [formValues, setFormValues] = useState<{ username?: string; password?: string }>({});
  const [formErrors] = useState<{ username?: string; password?: string }>({});
  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  function handleUsernameChange(username?: string) {
    setFormValues((prevValue) => ({ ...prevValue, username }));
  }

  function handlePasswordChange(password?: string) {
    setFormValues((prevValue) => ({ ...prevValue, password }));
  }

  function handleLoginClick() {
    formRef?.current?.submit();
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
            hint={formErrors?.username}
            value={formValues?.username}
            label="Email или телефон"
            name="username"
            onChange={handleUsernameChange}
          />
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
        </form>
        <Box flexDirection="row" justifyContent="end">
          <Link weight={400} size={16} height={24} href={theme?.url?.resetPassword}>
            Забыли пароль?
          </Link>
        </Box>
        <Box marginTop={16}>
          <Button
            onClick={handleLoginClick}
            label="Войти"
            disabled={!formValues?.username || !formValues.password || !!formErrors?.password || !!formErrors?.username}
          />
        </Box>
        <Box flex={1} />
        {!!theme?.url.social?.length && (
          <>
            <Typography weight={500} size={16} lineHeight={20} textAlign="center" color={COLORS.BLACK}>
              Или через соц сети
            </Typography>
            <Box marginTop={16} justifyContent="center" alignItems="center" marginBottom={24}>
              <ProviderButton type="google" href="#" />
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
