import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminProductsController } from './admin.products.controller';
import { ProductService } from 'src/services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';

@Module({
    controllers: [AdminController, AdminProductsController],
})

export class AdminModule {}
