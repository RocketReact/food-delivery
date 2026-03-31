import { Router } from "express";
import { createProduct, getProducts, getShops } from "../controllers/product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/shops", getShops);
export default router;