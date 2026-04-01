import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../schemas/product.schema";


export const createProduct = async (req: Request, res: Response) => {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error);
    return;
  }
  try {
    const product = await Product.create(parsed.data);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create product", details: error.message });
  }
};


export const getProducts = async (req: Request, res: Response) => {
  try {
    const { storeName, category, rating, deliveryTime } = req.query;
    const filter: Record<string, unknown> = {};
    if (storeName) filter.storeName = storeName;
    if (category) filter.category = category;
    if (rating) filter.rating = rating;
    if (deliveryTime) filter.deliveryTime = deliveryTime;
    const products = await Product.find(filter).limit(20).lean();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch products", details: error.message });
  }
};

export const getShops = async (req: Request, res: Response) => {
  try {
    const shops = await Product.distinct("storeName");
    res.status(200).json(shops);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch shops", details: error.message });
  }
};