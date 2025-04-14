import { Schema, Document } from 'mongoose';

export const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

export interface Customer extends Document {
  name: string;
  email: string;
  phone?: string;
}
