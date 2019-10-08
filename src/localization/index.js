import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './dictionaries/en.json';
import ru from './dictionaries/ru.json';
import {AsyncStorage} from 'react-native';

i18n.translations = {en, ru};
i18n.fallbacks = false;

const fallback = {languageTag: 'en', isRTL: false};
const {languageTag} =
  RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
  fallback;

AsyncStorage.getItem('language').then(res => {
  if (res) {
    i18n.locale = res;
  } else {
    i18n.locale = languageTag
  }
});

export default i18n;
