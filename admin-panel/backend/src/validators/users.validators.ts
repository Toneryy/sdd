import Joi from 'joi';

// Валидация создания пользователя
export const createUserSchema = Joi.object({
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

// Валидация обновления пользователя
export const updateUserSchema = Joi.object({
  username: Joi.string()
    .optional(),
  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Некорректный email',
    }),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .allow(null, '')
    .messages({
      'string.pattern.base': 'Некорректный формат телефона',
    }),
  password: Joi.string()
    .optional(),
}).min(1).messages({
  'object.min': 'Необходимо указать хотя бы одно поле для обновления',
});

// Валидация ID
export const idParamSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required()
    .messages({
      'string.guid': 'Некорректный формат ID',
      'any.required': 'ID обязателен',
    }),
});

// Валидация query параметров для списка клиентов
export const clientsQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Номер страницы должен быть числом',
      'number.min': 'Номер страницы должен быть не менее 1',
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(50)
    .messages({
      'number.base': 'Лимит должен быть числом',
      'number.min': 'Лимит должен быть не менее 1',
      'number.max': 'Лимит должен быть не более 100',
    }),
  search: Joi.string()
    .max(100)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Поисковый запрос должен быть не более 100 символов',
    }),
});

