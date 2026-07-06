// src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Получаем начальное значение из localStorage или используем initialValue
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.warn(`Ошибка парсинга localStorage по ключу "${key}":`, error);
        return initialValue;
      }
    }
    return initialValue;
  });

  // При изменении value сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}