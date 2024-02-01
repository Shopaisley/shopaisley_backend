import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetails } from './entities/orderdetails.entity';
import { OrderItems } from './entities/orderitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails,OrderItems])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}

export { OrderDetails };