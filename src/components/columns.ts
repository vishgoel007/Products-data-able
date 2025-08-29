import type { Product } from "../types/product";

export type Column = {
  field: keyof Product;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
  width: number;
};

export const productTableColumns: Column[] = [
  {
    field: "id",
    label: "ID",
    width: 20,
  },
  { field: "title", label: "Product Title", width: 180 },
  { field: "category", label: "Category", width: 75 },
  { field: "brand", label: "Brand", sortable: true, width: 75 },
  {
    field: "price",
    label: "Price ($)",
    sortable: true,
    numeric: true,
    width: 30,
  },
  {
    field: "discountPercentage",
    label: "Discount (%)",
    numeric: true,
    sortable: true,
    width: 30,
  },
  {
    field: "rating",
    label: "Rating",
    sortable: true,
    numeric: true,
    width: 30,
  },
  { field: "availabilityStatus", label: "Availability", width: 50 },
];
