import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ProductTable } from "../components/ProductTable";
import { useProducts } from "../hooks/useProducts";
import { ProductTableShimmer } from "../components/ProductTableShimmer";

const ProductPage = () => {
  const { isLoading, products, error, onRetry } = useProducts();
  return (
    <Box sx={{ width: "90%" }}>
      <Paper sx={{ width: "100%", mb: 2, mt: 2 }}>
        {isLoading || error ? (
          <ProductTableShimmer error={Boolean(error)} onRetry={onRetry} />
        ) : (
          <ProductTable products={products} />
        )}
      </Paper>
    </Box>
  );
};

export default ProductPage;
