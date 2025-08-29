import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { productTableColumns } from "./columns";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { memo } from "react";

const ProductTableHeadShimmer = memo(() => {
  return (
    <TableHead>
      <TableRow>
        {productTableColumns.map((column) => (
          <TableCell
            key={column.field}
            align={column.numeric ? "right" : "left"}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});

const ProductTableBodyShimmer = memo(() => {
  return (
    <TableBody>
      {Array.from({ length: 10 }).map((_, index) => (
        <TableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
});

export const ProductTableErrorBody = memo(
  ({ onRetry }: { onRetry?: () => void }) => {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8}>
            <Stack alignItems="center">
              <Typography sx={{ mb: 2 }}>Something went wrong.</Typography>
              <Button variant="contained" color="primary" onClick={onRetry}>
                Retry
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
);

type ProductTableShimmerProps = {
  error?: boolean;
  onRetry?: () => void;
};

export const ProductTableShimmer = memo(
  ({ error, onRetry }: ProductTableShimmerProps) => {
    return (
      <TableContainer>
        <Table aria-label="product table loading">
          <ProductTableHeadShimmer />
          {error ? (
            <ProductTableErrorBody onRetry={onRetry} />
          ) : (
            <ProductTableBodyShimmer />
          )}
        </Table>
      </TableContainer>
    );
  }
);
