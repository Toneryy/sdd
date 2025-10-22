import Joi from 'joi';

// Валидация регистрации
export const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Имя пользователя обязательно',
      'string.min': 'Имя пользователя должно быть не менее 3 символов',
      'string.max': 'Имя пользователя должно быть не более 50 символов',
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
    .min(6)
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'string.min': 'Пароль должен быть не менее 6 символов',
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

