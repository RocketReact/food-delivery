import {Schema, Document, model, models} from "mongoose";

export interface TypeProduct extends Document {
    name: string;
    description?: string;
    price: number;
    image: string;
    category: string;
}

export const ProductSchema = new Schema<TypeProduct>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
    },
    {
        timestamps: true,
    },
);

const Product = models.Product || model<TypeProduct>("Product", ProductSchema);

export default Product;
