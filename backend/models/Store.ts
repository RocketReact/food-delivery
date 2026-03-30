import { Schema, model, models } from "mongoose";

export interface StoreType {
  name: string;
  description?: string;
  rating?: number;
  deliveryTime?: string;
}

export const StoreSchema = new Schema<StoreType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    description: {
      type: String
    },
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    deliveryTime: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Store = models.Store || model<StoreType>("Store", StoreSchema);

export default Store;