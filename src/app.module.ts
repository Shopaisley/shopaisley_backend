import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantModule } from './merchant/merchant.module';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/entities/product.entity';
import { ProductCategory } from './product/entities/productcategory.entity';
import { ShoppingModule } from './shopping/shopping.module';
import { Auth } from './auth/entities/auth.entity';
import { OrderModule } from './order/order.module';
import { Merchant } from './merchant/entities/merchant.entity';
import { FilterModule } from './filter_search/filter_search.module';
import {OrderDetails} from './order/entities/orderdetails.entity';
import { OrderItems } from './order/entities/orderitem.entity';
import { PaymentsModule } from './payments/payments.module';
import { PaystackModule } from './paystack/paystack.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      url: process.env.DB_URL,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, ProductCategory, Merchant, OrderDetails,OrderItems],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    AuthModule,
    ProductModule,
    ShoppingModule,
    OrderModule,
    MerchantModule,
    FilterModule,
    OrderModule,
    PaymentsModule,
    PaystackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
// app.module.ts
