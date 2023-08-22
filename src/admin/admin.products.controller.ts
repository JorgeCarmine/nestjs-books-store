import { Body, Controller, Get, Param, Post, Redirect, Render, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Product } from "src/models/product.entity";
import { ProductService } from "src/services/product.service";

@Controller('/admin/products')
export class AdminProductsController {

    constructor(
        private readonly productsService: ProductService
    ){}

    @Get('/')
    @Render('admin/products/index')
    async index() {
        let viewData = [];
        viewData['products'] = await this.productsService.findAll()
        return { viewData };
    }

    @Get('/create')
    @Render('admin/products/create')
    create() {}

    @Post('/store')
    @UseInterceptors(FileInterceptor('image', { dest: './public/img/products' }))
    @Redirect('/admin/products')
    async store(@Body() body, @UploadedFile() file: Express.Multer.File) {
        const newProduct = new Product();
        newProduct.setName(body.name);
        newProduct.setPrice(body.price);
        newProduct.setDescription(body.description);
        newProduct.setImage(file.filename)
        await this.productsService.createOrUpdate(newProduct);
    }

    @Get('/:id')
    @Render('admin/products/show')
    async show(@Param() params) {
        let viewData = [];
        viewData['product'] = await this.productsService.findOne(params.id);
        return { viewData };
    }

    @Post('/:id/update')
    @UseInterceptors(FileInterceptor('image', { dest: './public/img/products' }))
    @Redirect('/admin/products')
    async update(@Body() body, @Param() params, @UploadedFile() file: Express.Multer.File) {
        const product = await this.productsService.findOne(params.id);
        product.setName(body.name);
        product.setPrice(body.price);
        product.setDescription(body.description);
        product.setImage(file.filename)
        await this.productsService.createOrUpdate(product);
    }
}
