import React from 'react';

import { ToastProvider } from './providers/ToastProvider/ToastProvider';
import { ButtonGenerator } from './pages';

import './App.css';

function App() {
  return (
    <ToastProvider>
      <ButtonGenerator />
    </ToastProvider>
  );
}

export default App;
