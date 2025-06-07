import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../src/store.js'; 
import i18next from 'i18next';
import global_en from "../src/translations/en/global.json";
import global_es from "../src/translations/es/global.json";
import global_de from "../src/translations/de/global.json";
import global_fr from "../src/translations/fr/global.json";

i18next.init({
  interpolation: { escapeValue: false }, 
  lng: 'en', // Default language
  resources: {
    en: { global: global_en },
    es: { global: global_es },
    de: { global: global_de },
    fr: { global: global_fr }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </I18nextProvider>
  </React.StrictMode>
);