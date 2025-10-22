import Joi from 'joi';

// Валидация логина
export const loginSchema = Joi.object({
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
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'string.min': 'Пароль должен быть не менее 6 символов',
      'any.required': 'Пароль обязателен',
    }),
});

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
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.empty': 'Пароль обязателен',
      'string.min': 'Пароль должен быть не менее 6 символов',
      'string.pattern.base': 'Пароль должен содержать заглавные, строчные буквы и цифры',
      'any.required': 'Пароль обязателен',
    }),
  role: Joi.string()
    .valid('administrator', 'operator')
    .default('operator')
    .messages({
      'any.only': 'Роль должна быть "administrator" или "operator"',
    }),
});

