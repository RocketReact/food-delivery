import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../schemas/product.schema";

export const createProduct = async (req: Request, res: Response) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error);
    return;
  }
  const product = await Product.create(parsed.data);
  res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
};