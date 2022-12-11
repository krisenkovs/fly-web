import { Button } from 'components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { store } from 'web/application/store';

export const PWAButton = observer(() => {
  const { promptInstall } = store;

  function handleClick(evt: any) {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  }

  return <Button label="Установить" onClick={handleClick} />;
});
