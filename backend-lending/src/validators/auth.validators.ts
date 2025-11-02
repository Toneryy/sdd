import Joi from 'joi';

// Валидация регистрации
export const registerSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Имя пользователя обязательно',
      'any.required': 'Имя пользователя обязательно',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email обязателен',
      'string.email': 'Некорректный email',
      'any.required': 'Email обязателен',
    }),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Некорректный формат телефона',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'any.required': 'Пароль обязателен',
    }),
});

// Валидация логина
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email обязателен',
      'string.email': 'Некорректный email',
      'any.required': 'Email обязателен',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'any.required': 'Пароль обязателен',
    }),
});

