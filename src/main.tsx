import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import '@mantine/core/styles.css';
import "./locale/i18n";
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import { routerConfig } from './routes/index.tsx';
import "@/assets/scss/main.scss";
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider>
        <Provider store={store}>  
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={routerConfig} />
          </PersistGate>
        </Provider>
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>,
)

// Reload the page when the i18n file changes
if (import.meta.hot) {
  import.meta.hot.accept(["./locale/i18n"], () => {});
}
