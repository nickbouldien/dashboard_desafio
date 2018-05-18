import { v4 } from 'node-uuid';

export const createUUID = () => {
  return v4();
}

export const resetState = () => {
  window.localStorage.clear();
}