import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

@Controller('recipe')
export class RecipeController {
  @Get()
  async handleProxifiedList(): Promise<void> {
    console.log('This controller method was reache for GET /recipe');

    throw new NotFoundException('Proxying expected for this path.');
  }

  @Get(':id')
  async handleProxifiedRecipe(@Param('id') id: string): Promise<void> {
    console.log(`This controller method was reached for GET /recipe/${id}`);

    throw new NotFoundException('Proxying expected for this path.');
  }
}
