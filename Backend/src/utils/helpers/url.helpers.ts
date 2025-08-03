import { nanoid } from 'nanoid';

export const generateShortCode = (length: number = 6): string => {
  return nanoid(length);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}