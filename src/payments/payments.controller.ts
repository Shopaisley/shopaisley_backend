/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { InitializeDto } from './dto/intialize-payment.dto';
import { VerifyLogin } from 'src/auth/guards/verifylogin.strategy';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(VerifyLogin)
  @Post('initialize')
  @ApiOperation({ summary: 'Initialize Payment' })
  @ApiResponse({ status: 201, description: 'Payment Initialized' })
  async initializePayment(@Body() initializePaymentDto: InitializeDto) {
    return this.paymentService.initializePayment(initializePaymentDto);
  }

  @UseGuards(VerifyLogin)
  @Post('/verify/:reference/:orderId')
  @ApiOperation({ summary: 'Verify Payment' })
  @ApiResponse({ status: 201, description: 'Payment Verified' })
  async verifyPayment(
    @Param('reference') reference: string,
    @Param('orderId') orderId: string,
  ) {
    return this.paymentService.verifyPayment(reference, orderId);
  }
  // @Post('verify/:orderId')
  // async verifyPayment(@Body('reference') reference: string, @Param('orderId') orderId: string) {
  //   return this.paymentService.verifyPayment(reference, orderId);
  // }
}

