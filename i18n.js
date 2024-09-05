const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const LanguageDetector = require('i18next-browser-languagedetector');  // to find out which lang
const path = require('path');

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',  // to be the defualt lang 
    preload: ['en', 'ar'],  // supported langs
    backend: {
      loadPath: path.join(__dirname, 'locales/{{lng}}/translation.json')  // translation files paths
    }
  });

module.exports = i18n;
