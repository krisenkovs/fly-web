import React, { FC, useContext } from 'react';
import { ThemeApplicationContext } from 'theme/application/ThemeApplication';
import { ErrorPage } from 'theme/pages/ErrorPage';
import { ForgotPage } from 'theme/pages/ForgotPage';
import { InfoPage } from 'theme/pages/InfoPage';
import { LoginPage } from 'theme/pages/LoginPage';
import { RegisterPage } from 'theme/pages/RegisterPage';
import { ResetPasswordPage } from 'theme/pages/ResetPasswordPage';

export const PageProvider: FC = () => {
  const theme = useContext(ThemeApplicationContext);

  switch (theme?.page) {
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    case 'forgot-password':
      return <ForgotPage />;
    case 'reset-password':
      return <ResetPasswordPage />;
    case 'info':
      return <InfoPage />;
    case 'error':
    case 'login-page-expired':
      return <ErrorPage />;
    default:
      return null;
  }
};
