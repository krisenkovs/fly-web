import { Button } from 'components';
import React, { useEffect, useState } from 'react';

export function PWAButton() {
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      console.log('beforeinstallprompt', e);
      e.preventDefault();
      setPromptInstall(e);
    };
    window.addEventListener('', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function handleClick(evt: any) {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  }

  return <Button label="Установить" onClick={handleClick} />;
}
