// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './routes/AppRoutes';  // Import the new AppRoutes component
import { persistor, store } from './redux/store';
import { ReactNotifications } from 'react-notifications-component'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ReactNotifications />
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  </StrictMode>
);
