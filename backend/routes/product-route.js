import express  from "express";
import { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product-controller.js";

const router = express.Router();

router.get("/",  getAllProducts);//to fetch all the products
router.get("/:id",  getProduct);//to fetch a specific product, we are using id for that

router.post("/", createProduct);//to create a product based on the data given by the user.
router.put("/:id", updateProduct);//to update a product
router.delete("/:id", deleteProduct);//to update a product


export default router