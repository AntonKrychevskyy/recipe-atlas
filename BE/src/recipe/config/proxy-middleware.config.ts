import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Socket } from 'net';

export const getProxyConfig = (apiUrl: string) => ({
  router: (req: Request) => {
    const reqUrl = new URL(req.url, `${req.protocol}://${req.get('host')}`);
    const queryParams = Object.fromEntries(reqUrl.searchParams);

    let targetEndpoint = Object.keys(queryParams).length
      ? '/search.php'
      : '/search.php?s=';
    if (reqUrl.href.match('/recipe/\\w+$')) {
      targetEndpoint = '/lookup.php';
    }
    if (!!queryParams.i || !!queryParams.a || !!queryParams.c) {
      targetEndpoint = '/filter.php';
    }

    return `${apiUrl}${targetEndpoint}`;
  },
  pathRewrite: {
    '/recipe/': '?i=',
    '/recipe': '',
  },
  on: {
    error: (error: Error, req: Request, res: Response | Socket, target) => {
      if (res instanceof Response) {
        (res as Response).status(HttpStatus.BAD_GATEWAY).json({
          message: 'Cannot connect to the target service.',
          error: error.message,
        });
      }
      console.error(
        `Proxy: Error connecting to ${JSON.stringify(target, null, 2)}:`,
        error.message,
      );
    },
  },
  changeOrigin: true,
});
