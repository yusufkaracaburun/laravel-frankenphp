import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      auth: {
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        email: 'Email',
        password: 'Password',
        name: 'Name',
        confirmPassword: 'Confirm Password',
      },
      common: {
        save: 'Save',
        cancel: 'Cancel',
        loading: 'Loading...',
      },
    },
  },
  tr: {
    translation: {
      auth: {
        login: 'Giriş',
        register: 'Kayıt',
        logout: 'Çıkış',
        email: 'E-posta',
        password: 'Şifre',
        name: 'Ad',
        confirmPassword: 'Şifre Tekrar',
      },
      common: {
        save: 'Kaydet',
        cancel: 'İptal',
        loading: 'Yükleniyor...',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
