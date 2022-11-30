import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Application } from 'web/application';
import { NotificationManager } from 'web/components/NotificationManager';

render(
  <BrowserRouter>
    <NotificationManager>
      <Application />
    </NotificationManager>
  </BrowserRouter>,
  document.getElementById('root'),
);
