import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Application } from 'web/application';
import { ConfirmProvider } from 'web/components/ConfirmProvider';
import { NotificationManager } from 'web/components/NotificationManager';

render(
  <BrowserRouter>
    <ConfirmProvider>
      <NotificationManager>
        <Application />
      </NotificationManager>
    </ConfirmProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`/sw.js`)
    .then(() => console.log('register'))
    .catch((err) => console.log(err));
}
