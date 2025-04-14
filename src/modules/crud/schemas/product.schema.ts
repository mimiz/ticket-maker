import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

export interface Product extends Document {
  name: string;
  price: number;
  description?: string;
}
