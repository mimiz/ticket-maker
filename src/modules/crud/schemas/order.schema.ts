import { Schema, Document } from 'mongoose';

export const OrderSchema = new Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, required: true }, // Added mandatory date field
});

export interface Order extends Document {
  productId: string;
  quantity: number;
  totalPrice: number;
}
