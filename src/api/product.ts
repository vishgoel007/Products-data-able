import axios from "axios";
import type { Product } from "../types/product";

const fields: string[] = [
  "id",
  "title",
  "price",
  "category",
  "discountPercentage",
  "rating",
  "brand",
  "availabilityStatus",
];

const limit: number = 102;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&select=${fields.join(",")}`
    );
    return res.data?.products || [];
  } catch (error) {
    throw new Error("Failed to fetch products", { cause: error });
  }
};
