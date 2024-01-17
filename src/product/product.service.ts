/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}


  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct: Product = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }


  async findAll() {
    return this.productRepository.find();
  }


  async findOne(id: string): Promise<Product|null> {
    const options: FindOneOptions<Product> = {
      where: { id },
    };

    const product = await this.productRepository.findOne(options);

    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }

    return product;
  }


  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.findOne(id);
    Object.assign(existingProduct, updateProductDto);
    return this.productRepository.save(existingProduct);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
    // if (result.affected === 0) {
    //   throw new NotFoundException('Product not found');
    // }
  }

}
