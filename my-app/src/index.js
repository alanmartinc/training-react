import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from "react-i18next"
import i18next from 'i18next';
import form_en from "./Translations/en/form.json"
import form_es from "./Translations/es/form.json"
import login_en from "./Translations/en/login.json"
import login_es from "./Translations/es/login.json"

i18next.init({
  interpolation: { escapeValue: false},
  lng: "es",
  resources: {
    es: {
      form: form_es,
      login: login_es,
    },
    en: {
      form: form_en,
      login: login_en,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);


