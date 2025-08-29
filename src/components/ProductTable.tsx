import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { ProductTableHead } from "./ProductTableHead";
import type { Filters, Product, SortDescriptor } from "../types/product";
import { ProductTableBody } from "./ProductTableBody";
import { ProductTablePagination } from "./ProductTablePagination";
import { useDerivedProducts } from "../hooks/useDerivedProducts";
import { TableHeader } from "./TableHeader";
import { Divider } from "@mui/material";
import { memo, useState } from "react";
import { TableFilter } from "./TableFilter";

interface ProductTableProps {
  products: Product[];
}

const defaultRowsPerPage = 10;

export const ProductTable = memo(({ products }: ProductTableProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    minRating: null,
  });

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    visibleProducts,
    emptyRows,
    totalProducts,
    categories,
  } = useDerivedProducts({
    products,
    defaultRowsPerPage,
    searchQuery,
    sort,
    filters,
  });

  return (
    <>
      <TableContainer>
        <TableHeader value={searchQuery} setValue={setSearchQuery} />
        <Divider />
        <TableFilter
          filters={filters}
          setFilters={setFilters}
          categories={categories}
        />
        <Divider />
        <Table aria-label="product table">
          <ProductTableHead sort={sort} setSort={setSort} />
          <ProductTableBody tableRows={visibleProducts} emptyRows={emptyRows} />
        </Table>
      </TableContainer>
      <ProductTablePagination
        rowsCount={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
});
