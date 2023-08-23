import { Body, Controller, Get, Param, Post, Redirect, Render, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Product } from "src/models/product.entity";
import { ProductsService } from "src/services/product.service";
import { S3Service } from "src/services/s3.service";

@Controller('/admin/products')
export class AdminProductsController {

    constructor(
        private readonly s3Service: S3Service,
        private readonly productsService: ProductsService
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
    // @UseInterceptors(FileInterceptor('image', { dest: './public/img/products' }))
    @UseInterceptors(FileInterceptor('image'))
    @Redirect('/admin/products')
    async store(@Body() body, @UploadedFile() file: Express.Multer.File) {
        const fileName = Date.now().toString();
        const newProduct = new Product();
        newProduct.setName(body.name);
        newProduct.setPrice(body.price);
        newProduct.setDescription(body.description);

        if(file) {
            await this.s3Service.uploadFile(`products/${fileName}`, file);
            newProduct.setImage(fileName);
        }

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
    @UseInterceptors(FileInterceptor('image'))
    @Redirect('/admin/products')
    async update(@Body() body, @Param() params, @UploadedFile() file: Express.Multer.File) {
        const product = await this.productsService.findOne(params.id);
        product.setName(body.name);
        product.setPrice(body.price);
        product.setDescription(body.description);
        
        if(file) {
            const fileName = Date.now().toString();
            await this.s3Service.uploadFile(`products/${fileName}`, file);
            await this.s3Service.deleteFile(`products/${product.getImage()}`);

            product.setImage(fileName);
        }

        await this.productsService.createOrUpdate(product);
    }

    @Post(':id/delete')
    @Redirect('/admin/products')
    async delete(@Param() params) {
        await this.productsService.deleteProduct(params.id);
    }
}
