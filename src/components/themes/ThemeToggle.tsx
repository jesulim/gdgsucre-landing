import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') ?? 'light';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const handleToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text hover:bg-primary-200 dark:hover:bg-primary-800"
    >
      {theme === 'light' ? (
        '🌙'
      ) : (
        '☀️'
      )}
    </button>
  );
};
