import { Request, Response } from "express";
import { orderSchema } from "../schemas/order.schema";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json(parsed.error);
    return;
  }
  try {
    const order = await Order.create(parsed.data);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};
