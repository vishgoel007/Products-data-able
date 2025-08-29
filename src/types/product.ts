import type { TableSortLabelOwnProps } from "@mui/material/TableSortLabel";

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  discountPercentage: number;
  rating: number;
  brand: string;
  availabilityStatus: string;
};

export type SortDir = TableSortLabelOwnProps["direction"];

export type SortDescriptor = {
  field: keyof Product;
  dir: SortDir;
};

export type Filters = {
  categories: string[];
  minRating: number | null;
};
