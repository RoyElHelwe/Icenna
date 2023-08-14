import { createContext, useEffect, useState } from 'react';
import languages from '../configs/languages';
import themeConfig from '../configs/theme';

export const storSettingsKeyName = 'settings';

const initialSettings = {
  mode: themeConfig.mode,
  direction: themeConfig.direction,
  language: themeConfig.language,
};

const restoreSettings = () => {
  let settings = null;
  try {
    const storedData = window.localStorage.getItem(storSettingsKeyName);
    if (storedData) {
      settings = { ...JSON.parse(storedData), };
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
}

// set settings in localStorage
const storeSettings = (settings) => {
  const initSettings = Object.assign({}, settings);
  window.localStorage.setItem(storSettingsKeyName, JSON.stringify(initSettings));
};

export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children, pageSettings }) => {
  const [settings, setSettings] = useState({ ...initialSettings });
  useEffect(() => {
    const restoredSettings = restoreSettings();
    if (restoredSettings) {
      setSettings({ ...restoredSettings });
    }
    if (pageSettings) {
      setSettings({ ...settings, ...pageSettings });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSettings]);

  const saveSettings = (updatedSettings) => {
    const res = { ...updatedSettings, direction: languages.find((l) => l.code === updatedSettings.language)?.direction || 'ltr' };

    storeSettings(res);
    setSettings(res);
  };

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>;
};

export const SettingsConsumer = SettingsContext.Consumer;
