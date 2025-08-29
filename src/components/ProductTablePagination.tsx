import TablePagination from "@mui/material/TablePagination";
import { memo } from "react";

interface ProductTablePaginationProps {
  rowsCount: number;
  rowsPerPage: number;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProductTablePagination = memo(
  ({
    rowsCount,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  }: ProductTablePaginationProps) => {
    return (
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
  }
);
