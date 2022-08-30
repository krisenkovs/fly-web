import {Box} from 'components/Box';
import {Button} from 'components/Button';
import {FloatInput} from 'components/FloatInput';
import {Typography} from 'components/Typography';
import {COLORS} from "constant";
import React, {FC, useContext, useRef, useState} from 'react';
import {ThemeApplicationContext} from 'theme/application/ThemeApplication';
import {Header} from 'theme/components/Header';

export const ResetPasswordPage: FC = () => {
  const [formValues, setFormValues] = useState<{ password?: string }>({});
  const [formErrors] = useState<{ password?: string }>({});
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
            hint={formErrors?.password}
            value={formValues?.password}
            type="password"
            label="Пароль"
            name="password-new"
            onChange={handleUsernameChange}
          />
          <input hidden name="password-confirm" id="password-confirm" value={formValues?.password} />
        </form>
        <Box marginTop={24}>
          <Button
            onClick={handleFormClick}
            label="Востановить пароль"
            disabled={!formValues?.password || !!formErrors?.password}
          />
        </Box>
        <Box flex={1} />
      </Box>
    </Box>
  );
};
