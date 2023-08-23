import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { ProductsService } from './services/product.service';

@Controller('/products')
export class ProductController {

    constructor(
        private readonly productService: ProductsService
    ) {}

  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['description'] = 'Best tech books store';
    viewData['author'] = 'Developed by Jorge Carmine';
    viewData['title'] = 'Tech books';
    viewData['subtitle'] = 'About us';

    viewData['products'] = await this.productService.findAll();

    return { viewData };
  }

  @Get('/:id')
  async show(@Param() params, @Res() response) {
    const product = await this.productService.findOne(params.id);

    if(!product) return response.redirect('/products');

    const viewData = [];
    viewData['title'] = product.getName();
    viewData['subtitle'] = product.getName() + ' - Information';
    viewData['product'] = product;

    return response.render('products/show', { viewData })
  }
}
