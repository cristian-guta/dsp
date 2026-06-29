import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type FontScale = 0 | 1 | 2 | 3;

interface AccessibilitySettings {
  fontScale: FontScale;
  highContrast: boolean;
  underlineLinks: boolean;
  dyslexiaFont: boolean;
  pauseAnimations: boolean;
}

interface AccessibilityContextValue extends AccessibilitySettings {
  setFontScale: (scale: FontScale) => void;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  toggleHighContrast: () => void;
  toggleUnderlineLinks: () => void;
  toggleDyslexiaFont: () => void;
  togglePauseAnimations: () => void;
  reset: () => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontScale: 0,
  highContrast: false,
  underlineLinks: false,
  dyslexiaFont: false,
  pauseAnimations: false,
};

const STORAGE_KEY = 'dsp-accessibility';

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

function loadSettings(): AccessibilitySettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(saved);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    const root = document.documentElement;

    root.style.setProperty('--a11y-font-scale', String(1 + settings.fontScale * 0.125));

    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-underline-links', settings.underlineLinks);
    root.classList.toggle('a11y-dyslexia-font', settings.dyslexiaFont);
    root.classList.toggle('a11y-pause-animations', settings.pauseAnimations);
  }, [settings]);

  const setFontScale = useCallback((scale: FontScale) => {
    setSettings((s) => ({ ...s, fontScale: scale }));
  }, []);

  const increaseFontScale = useCallback(() => {
    setSettings((s) => ({ ...s, fontScale: Math.min(3, s.fontScale + 1) as FontScale }));
  }, []);

  const decreaseFontScale = useCallback(() => {
    setSettings((s) => ({ ...s, fontScale: Math.max(0, s.fontScale - 1) as FontScale }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((s) => ({ ...s, highContrast: !s.highContrast }));
  }, []);

  const toggleUnderlineLinks = useCallback(() => {
    setSettings((s) => ({ ...s, underlineLinks: !s.underlineLinks }));
  }, []);

  const toggleDyslexiaFont = useCallback(() => {
    setSettings((s) => ({ ...s, dyslexiaFont: !s.dyslexiaFont }));
  }, []);

  const togglePauseAnimations = useCallback(() => {
    setSettings((s) => ({ ...s, pauseAnimations: !s.pauseAnimations }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        setFontScale,
        increaseFontScale,
        decreaseFontScale,
        toggleHighContrast,
        toggleUnderlineLinks,
        toggleDyslexiaFont,
        togglePauseAnimations,
        reset,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextValue => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};