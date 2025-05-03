import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@nestjs/common';

export const validateQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqUrl = new URL(req.url, `${req.protocol}://${req.get('host')}`);

    const originalPath = reqUrl.pathname;
    const queryParams = Object.fromEntries(reqUrl.searchParams);

    if (originalPath && originalPath.match('/recipe/\\w+$')) {
      const keys = Object.keys(queryParams);
      if (keys.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Query parameters are not allowed for /recipe/:id. Provided: ${keys.join(', ')}.`,
          error: 'Bad Request',
        });
      }
    }

    if ('s' in queryParams) {
      const unsupportedKeys = Object.keys(queryParams).filter(
        (key) => key !== 's',
      );

      if (unsupportedKeys.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Cannot combine search and other query parameters for /recipe. Provided: ${unsupportedKeys.join(', ')}.`,
          error: 'Bad Request',
        });
      }
    }

    const unsupportedKeys = Object.keys(queryParams).filter(
      (key) => !['a', 'c', 'i', 's'].includes(key),
    );

    if (unsupportedKeys.length) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Unsupported query parameters for /recipe. Provided: ${unsupportedKeys.join(', ')}.`,
        error: 'Bad Request',
      });
    }

    return next();
  } catch (error) {
    console.error(
      'Error parsing URL in validation query parameters middleware: ',
      error,
    );

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error during URL processing.',
      error: 'Internal Server Error',
    });
  }
};
