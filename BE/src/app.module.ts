import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
