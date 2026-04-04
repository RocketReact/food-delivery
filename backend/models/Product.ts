import { Schema, model, models, Model, Types } from "mongoose";

export const CATEGORIES = ["Burgers", "Drinks", "Desserts", "Pizza", "Pasta", "Salads", "Seafood"] as const;
export type CategoryType = typeof CATEGORIES[number];

export interface ProductType {
  name: string;
  description?: string;
  price: number;
  image: string;
  category: CategoryType;
  storeId?: Types.ObjectId;
  storeName?: string;
}

export const ProductSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: [true, "Price is required"]
    },
    image: {
      type: String,
      required: [true, "Image is required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: CATEGORIES,
        message: "Category must be one of: " + CATEGORIES.join(", ")
      }
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store"
    },
    storeName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Product = (models.Product || model<ProductType>("Product", ProductSchema)) as Model<ProductType>;

export default Product;
