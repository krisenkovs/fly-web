import React, { FC, useEffect, useState } from 'react';
import { PageProvider } from 'theme/application/PageProvider';

export const ThemeApplicationContext = React.createContext<Theme | undefined>(undefined);

type Theme = {
  page: string;
  realm: string;
  url: {
    registration?: string;
    resetPassword?: string;
    login?: string;
    action: string;
    resource: string;
    base: string;
  };
  message: {
    type: string;
    text: string;
  };
  fields: Record<string, string>;
  fieldsError: Record<string, string>;
  actionCode: string;
};

interface WindowTheme extends Window {
  theme: Theme;
}

const { theme } = window as unknown as WindowTheme;

export const ThemeApplication: FC = () => {
  const [settings, setTSettings] = useState<Theme>();

  useEffect(() => {
    if (theme) setTSettings({ ...theme });
  }, []);

  return (
    <>
      <ThemeApplicationContext.Provider value={settings}>
        <PageProvider />
      </ThemeApplicationContext.Provider>
    </>
  );
};
