import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaystackService } from 'src/paystack/paystack.service';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';
import { InitializeDto } from './dto/intialize-payment.dto';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paystackService: PaystackService,
    private orderService: OrderService,

    @InjectRepository(OrderDetails)
    private readonly orderdetailsRepository: Repository<OrderDetails>,
  ) {}

  async initializePayment(
    initializePaymentDto: InitializeDto,
  ) {
    const { orderId, email, amount, callback_url} = initializePaymentDto;
    const order = await this.orderdetailsRepository.findOne({where: {id: orderId} });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Initialize payment with Paystack
    const paymentData = await this.paystackService.initializePayment(
      email,
      amount,
      callback_url,
    );
    return { paymentData, orderId };
  }

  async verifyPayment(reference: string, orderId: string) {
    const verificationResponse =
      await this.paystackService.verifyPayment(reference);

      console.log('verificationResponse', verificationResponse)

    if (verificationResponse.data.status === 'success') {
      const order = await this.orderdetailsRepository.findOne({ where: { id: orderId } });
      if (!order) {
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Payment successful and order completed' };
    } else {
      throw new HttpException(
        'Payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
