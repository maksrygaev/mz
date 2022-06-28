import { message } from 'antd';
import { Rule } from 'antd/lib/form';

export const inputNormalize = (value: string) => (value ? value.trim() : '');

export const emailRule = (message: string): Rule => ({
  type: 'email',
  message,
  transform: inputNormalize,
});

export const nameRule = (message: string): Rule => ({
  message,
  min: 4,
  transform: inputNormalize,
});

export const urlRule = (message: string): Rule => ({
  type: 'url',
  message,
  pattern: new RegExp(
    '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})',
  ),
  transform: inputNormalize
})

export const twitterRule = (message: string): Rule => ({
  message,
  pattern: new RegExp('(?<=^|(?<=[^a-zA-Z0-9-_.]))@([A-Za-z]+[A-Za-z0-9-_]+)'),
  transform: inputNormalize,
});


export const requiredRule = (message: string): Rule => ({
  required: true,
  message,
  transform: inputNormalize,
});

export const confirmationCodeRule = (message: string): Rule => ({
  message,
  pattern: new RegExp('(^[A-Za-z0-9]+$)'),
  transform: inputNormalize,
});

export const passwordRule = (message: string): Rule => ({
  message,
  pattern: new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}'),
  transform: inputNormalize,
});
