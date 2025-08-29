import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../api/product";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProductsUtil = useCallback(async () => {
    setIsLoading(true);
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onRetry = useCallback(() => {
    fetchProductsUtil();
  }, [fetchProductsUtil]);

  useEffect(() => {
    fetchProductsUtil();
  }, [fetchProductsUtil]);

  return { products, isLoading, error, onRetry };
};
