import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Middleware для валидации тела запроса с помощью Joi
 */
export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Показать все ошибки, а не только первую
      stripUnknown: true, // Удалить неизвестные поля
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        message: 'Ошибка валидации',
        errors,
      });
    }

    // Заменяем req.body на валидированное значение
    req.body = value;
    next();
  };
};

/**
 * Middleware для валидации query параметров
 */
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        message: 'Ошибка валидации параметров',
        errors,
      });
    }

    // В Express 5 req.query readonly, используем Object.assign
    Object.assign(req.query, value);
    next();
  };
};

/**
 * Middleware для валидации params
 */
export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        message: 'Ошибка валидации параметров URL',
        errors,
      });
    }

    // В Express 5 req.params readonly, используем Object.assign
    Object.assign(req.params, value);
    next();
  };
};

