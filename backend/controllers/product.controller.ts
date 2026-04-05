import { Request, Response } from "express";
import Product from "../models/Product";
import { productSchema } from "../schemas/product.schema";
import Store from "../models/Store";


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
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = 10;
  const skip = (page - 1) * limit;
  try {
    const { storeName, category, sort } = req.query;
    const filter: Record<string, unknown> = {};
    if (storeName) {
      filter.storeName = Array.isArray(storeName) ? { $in: storeName } : storeName;
    }
    if (category) {
      filter.category = Array.isArray(category) ? { $in: category } : category;
    }

    let sortOption: Record<string, 1 | -1> = {};

    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "name_asc":
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter)
    ]);
    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch products", details: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch categories", details: error.message });
  }
};

export const getShops = async (req: Request, res: Response) => {
  const { rating } = req.query;
  const filter: Record<string, unknown> = {};
  if (rating) {
    const r = Number(rating);
    filter.rating = { $gte: r };
  }
  try {
    const shops = await Store.find(filter).lean();
    res.status(200).json(shops);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch shops", details: error.message });
  }
};