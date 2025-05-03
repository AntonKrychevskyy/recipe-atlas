import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { validateQueryParams } from './middlewares/validate-query-params.middleware';
import { getProxyConfig } from './config/proxy-middleware.config';
import { RecipeController } from './recipe.controller';

@Module({
  controllers: [RecipeController],
})
export class RecipeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validateQueryParams)
      .forRoutes(RecipeController)
      .apply(
        createProxyMiddleware(
          getProxyConfig(
            [
              process.env.API_HOST,
              process.env.API_ENTRY,
              process.env.API_KEY,
            ].join('/'),
          ),
        ),
      )
      .forRoutes(RecipeController);
  }
}
