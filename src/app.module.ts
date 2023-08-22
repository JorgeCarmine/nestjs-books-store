import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { ProductService } from './services/product.service';
import { Product } from './models/product.entity';
import { AdminProductsController } from './admin/admin.products.controller';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.HOST,
      "port": parseInt(process.env.PORT),
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE_NAME,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    TypeOrmModule.forFeature([Product]),
    AdminModule
  ],
  controllers: [AppController, ProductController, AdminController],
  providers: [ProductService],
  exports: [ProductService]
})
export class AppModule {}
