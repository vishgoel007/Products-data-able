import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Product } from "../types/product";
import { memo } from "react";

interface ProductTableBodyProps {
  emptyRows: number;
  tableRows: Product[];
}

const sanitizeValue = (value: string | number | undefined) => {
  return value ?? "-";
};

export const ProductTableBody = memo(
  ({ tableRows, emptyRows }: ProductTableBodyProps) => {
    return (
      <TableBody>
        {tableRows.map((row) => (
          <TableRow hover key={row.id}>
            <TableCell scope="row">{sanitizeValue(row.id)}</TableCell>
            <TableCell>{sanitizeValue(row.title)}</TableCell>
            <TableCell>{sanitizeValue(row.category)}</TableCell>
            <TableCell>{sanitizeValue(row.brand)}</TableCell>
            <TableCell align="right">{sanitizeValue(row.price)}</TableCell>
            <TableCell align="right">
              {sanitizeValue(row.discountPercentage)}
            </TableCell>
            <TableCell align="right">{sanitizeValue(row.rating)}</TableCell>
            <TableCell>{sanitizeValue(row.availabilityStatus)}</TableCell>
          </TableRow>
        ))}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={8} />
          </TableRow>
        )}
      </TableBody>
    );
  }
);
