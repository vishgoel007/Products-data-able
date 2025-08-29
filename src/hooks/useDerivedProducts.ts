import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Filters, Product, SortDescriptor } from "../types/product";
import { filterProducts, sortProductsByField } from "../utils";
import { sortBy, uniq } from "lodash";

type Params = {
  products: Product[];
  searchQuery?: string;
  sort?: SortDescriptor[];
  defaultRowsPerPage?: number;
  filters: Filters;
};

export const useDerivedProducts = ({
  products,
  defaultRowsPerPage,
  searchQuery,
  sort,
  filters,
}: Params) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 10);

  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    setPage(0);
  }, [deferredQuery, sort, filters]);

  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const filteredProducts = useMemo(() => {
    return filterProducts(products, deferredQuery || "", filters);
  }, [products, deferredQuery, filters]);

  const filteredSortedProducts = useMemo(() => {
    return sortProductsByField(filteredProducts, sort ?? []);
  }, [filteredProducts, sort]);

  const visibleProducts = useMemo(() => {
    return filteredSortedProducts.slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  }, [filteredSortedProducts, page, rowsPerPage]);

  const categories = useMemo(() => {
    return sortBy(
      uniq(
        products
          .filter((p) => Boolean(p.category))
          .map((p) => p.category as string)
      )
    );
  }, [products]);

  const totalProducts = filteredSortedProducts.length;

  const emptyRows = useMemo(() => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalProducts) : 0;
  }, [totalProducts, page, rowsPerPage]);

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    visibleProducts,
    emptyRows,
    totalProducts,
    categories,
  };
};
