import cryptoJS from 'crypto-js';

export const hash = (message: any) => cryptoJS.SHA1(message).toString();
