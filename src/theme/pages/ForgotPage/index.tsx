import { COLORS } from 'constant';
import React, { FC, useContext, useRef, useState } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { Header } from 'theme/components/Header';

import { Box } from 'components/Box';
import { Button } from 'components/Button';
import { FloatInput } from 'components/FloatInput';
import { Typography } from 'components/Typography';

export const ForgotPage: FC = () => {
  const [formValues, setFormValues] = useState<{ username?: string }>({});
  const [formErrors] = useState<{ username?: string }>({});
  const theme = useContext(ThemeApplicationContext);
  const formRef = useRef<HTMLFormElement>(null);

  function handleUsernameChange(username?: string) {
    setFormValues((prevValue) => ({ ...prevValue, username }));
  }

  function handleFormClick() {
    formRef?.current?.submit();
  }

  return (
    <Box flex={1}>
      <Header
        title="Забыл пароль?"
        info={
          <>
            <Typography weight={400} size={16} lineHeight={24} color={COLORS.BLACK}>
              Напомни нам email или телефон,
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
            hint={formErrors?.username}
            value={formValues?.username}
            label="Email или телефон"
            name="username"
            onChange={handleUsernameChange}
          />
        </form>
        <Box marginTop={24}>
          <Button
            onClick={handleFormClick}
            label="Отправить ссылку"
            disabled={!formValues?.username || !!formErrors?.username}
          />
        </Box>
        <Box flex={1} />
      </Box>
    </Box>
  );
};
