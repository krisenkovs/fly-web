import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Application } from 'web/application';

render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/service-worker.js`);
}
