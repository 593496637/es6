import { createContext } from 'react';

export const UserContext = createContext({
  name: '小明大的',
  age: 18,
});

export const ThemeContext = createContext();