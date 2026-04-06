import { Request, Response } from "express";
import { orderSchema } from "../schemas/order.schema";
import Order from "../models/Order";
import { Types } from "mongoose";

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
    res.status(500).json({ error: "Failed create order", details: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const { _id, email, phone } = req.query;

  try {
    if (_id && !Types.ObjectId.isValid(String(_id))) {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }
    const filter: Record<string, unknown> = {};
    if (_id)   filter._id = new Types.ObjectId(String(_id));
    if (email) filter["customer.email"] = String(email);
    if (phone) filter["customer.phone"] = String(phone);

    const orders = await Order.find(filter as any);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get orders", details: error.message });
  }
};

