import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './dictionaries/en.json';
import ru from './dictionaries/ru.json';

i18n.translations = {en, ru};
i18n.fallbacks = false;

const fallback = {languageTag: 'en', isRTL: false};
const {languageTag} =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
  fallback;

  i18n.locale = languageTag


export default i18n;
