import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { ProductsService } from './services/product.service';
import { Product } from './models/product.entity';
import { UsersService } from './services/users.service';
import { User } from './models/user.entity';
import { AuthModule } from './auth/auth.module';
import { S3Service } from './services/s3.service';

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
    TypeOrmModule.forFeature([Product, User]),
    AdminModule,
    AuthModule
  ],
  controllers: [AppController, ProductController],
  providers: [ProductsService, UsersService, S3Service],
  exports: [ProductsService, UsersService, S3Service]
})
export class AppModule {}
