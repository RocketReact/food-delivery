import { Router } from "express";
import { createProduct, getCategories, getProducts, getShops } from "../controllers/product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/shops", getShops);
router.get("/categories", getCategories);
export default router;