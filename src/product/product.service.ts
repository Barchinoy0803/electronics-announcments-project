import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PRODUCT_STATUS } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      let product = await this.prisma.product.create({ data: createProductDto })
      return product
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let products = await this.prisma.product.findMany({
        include: {
          color: true,
          category: true,
          Comment: true,
          Likes: true
        },
        where: { status: PRODUCT_STATUS.ACTIVE }
      })
      if (!products.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return products
    } catch (error) {
      return new BadRequestException(error)
    }
  }
  async changeProductStatus(body: {productId: string, status: PRODUCT_STATUS}) {
    try {
      let product = await this.prisma.product.findUnique({ 
        where: { id: body.productId }
      });
      console.log(product);
      
      if (!product) {
        throw new BadRequestException('Product not found');
      }
  
      let updatedProduct = await this.prisma.product.update({
        data: { status: body.status },
        where: { id: body.productId }
      });
      
      return updatedProduct;
    } catch (error) {
      throw new BadRequestException(error.message || error);
    }
  }
  
  async findOne(id: string) {
    try {
      let product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          color: true,
          category: true
        }
      })
      if (!product) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return product
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      let updated = await this.prisma.product.update({
        data: updateProductDto,
        where: { id }
      })
      return updated
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.product.delete({ where: { id } })
      return deleted
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async getProductsByUser(){

  }
}
