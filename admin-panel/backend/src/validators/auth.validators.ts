import Joi from 'joi';

// Валидация логина
export const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty': 'Имя пользователя обязательно',
      'any.required': 'Имя пользователя обязательно',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'any.required': 'Пароль обязателен',
    }),
});

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
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'any.required': 'Пароль обязателен',
    }),
  role: Joi.string()
    .valid('administrator', 'operator')
    .default('operator')
    .messages({
      'any.only': 'Роль должна быть "administrator" или "operator"',
    }),
});

