import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { OrdersController } from './orders.controller';
import { CustomersController } from './customers.controller';
import { ProductsService } from './products.service';
import { OrdersService } from './orders.service';
import { CustomersService } from './customers.service';
import { ProductSchema } from './schemas/product.schema';
import { OrderSchema } from './schemas/order.schema';
import { CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'Customer', schema: CustomerSchema },
    ]),
  ],
  controllers: [ProductsController, OrdersController, CustomersController],
  providers: [ProductsService, OrdersService, CustomersService],
})
export class CrudModule {}
