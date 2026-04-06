import { Schema, model, models } from "mongoose";

export interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalPrice: number;
}

export const OrderSchema = new Schema<Order>(
  {
    customer: {
      name: { type: String, required: true, trim: true, minlength: 3 },
      email: { type: String, required: true, trim: true, lowercase: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true }
    },
    items: [
      {
        id: { type: Schema.Types.Mixed, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String }
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false
  }
);

const Order = models.Order || model<Order>("Order", OrderSchema);
export default Order;
