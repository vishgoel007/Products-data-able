import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { productTableColumns } from "./columns";
import { memo, useMemo } from "react";
import type { Product, SortDescriptor } from "../types/product";
import { toggleSort } from "../utils";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "darkgray",
    color: "#fff",
    fontWeight: "bold",
  },
}));

interface ProductTableHeadProps {
  sort: SortDescriptor[];
  setSort: (updatedSort: SortDescriptor[]) => void;
}

export const ProductTableHead = memo(
  ({ sort, setSort }: ProductTableHeadProps) => {
    const sortMap = useMemo(
      () => Object.fromEntries(sort.map((s) => [s.field, s.dir])),
      [sort]
    );

    const handleSetSort = (field: keyof Product) => {
      setSort(toggleSort(sort, field));
    };

    return (
      <TableHead>
        <TableRow>
          {productTableColumns.map((column) => (
            <StyledTableCell
              key={column.field}
              sx={{ width: column.width }}
              align={column.numeric ? "right" : "left"}
              sortDirection={
                sortMap[column.field] ? sortMap[column.field] : false
              }
            >
              {column.sortable ? (
                <TableSortLabel
                  active={Boolean(sortMap[column.field])}
                  direction={sortMap[column.field]}
                  onClick={() => handleSetSort(column.field)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
);
