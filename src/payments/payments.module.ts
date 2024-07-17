import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentController } from './payments.controller';
import { OrderService } from 'src/order/order.service';
import { PaystackModule } from 'src/paystack/paystack.module';
import { PaystackService } from 'src/paystack/paystack.service';
import { OrderModule } from 'src/order/order.module';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItems } from 'src/order/entities/orderitem.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails, OrderItems]),
    UserModule, 
    PaystackModule,
    OrderModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },
  })],
  controllers: [PaymentController],
  providers: [PaymentService, OrderService, PaystackService],
})
export class PaymentsModule {}