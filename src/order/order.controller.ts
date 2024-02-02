import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  async create(@Body() createOrderDto: CreateOrderDto, @Res() response) {
    const data = await this.orderService.create(createOrderDto);
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Order created successfully',
      data: data,
    });
  }

  @Patch()
  @ApiOperation({ summary: 'Add a product to cart' })
  @ApiResponse({ status: 201, description: 'Product successfully added to cart' })
  async add_to_cart(@Body() createOrderItemDto: CreateOrderItemDto, @Res() response) {
    const data = await this.orderService.add_to_cart(createOrderItemDto);
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Order created successfully',
      data: data,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Orders successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Orders not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async findAll(@Res() response) {
    const data = await this.orderService.findAll();

    response.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Orders retrieved successfully',
      data: data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const order = await this.orderService.findOne(id);

      if (!order) {
        throw new NotFoundException(`Order with id: ${id} not found`); // Use a suitable error type
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Order retrieved successfully',
        data: order,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get('user/:user_id') // Update the route to include userId as a parameter
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiResponse({ status: 200, description: 'Orders successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Orders not found for the user' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findByUserId(@Param('user_id') user_id: string, @Res() response) {
    try {
      // Update the service method to retrieve orders by user ID
      const orders = await this.orderService.findByUserId(user_id);

      if (!orders) {
        throw new NotFoundException(
          `Orders not found for user with id: ${user_id}`,
        );
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Patch('MakeOrder/:id')
  @ApiOperation({ summary: 'Update order status by ID' })
  @ApiResponse({ status: 200, description: 'Order status successfully updated' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Res() response) {
    try {
      const orderToUpdate = await this.orderService.findOne(id);

      if (!orderToUpdate) {
        throw new NotFoundException(`Product with id: ${id} not found`); 
      }
      
      const updatedOrder = await this.orderService.update(id, updateOrderDto);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Order updated successfully',
        data: updatedOrder,
      });
      
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }
}
