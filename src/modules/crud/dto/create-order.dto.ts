export class CreateOrderDto {
  productId: string;
  quantity: number;
  totalPrice: number;
  date: Date; // Added mandatory date field
}
