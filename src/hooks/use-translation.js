import { useTranslation as i18nUseTranslation } from 'react-i18next';

export function useTranslation(text) {
  const { t } = i18nUseTranslation();

  return t(text);
}
