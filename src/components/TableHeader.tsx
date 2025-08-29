import { Box, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { memo } from "react";

interface TableHeaderProps {
  value: string;
  setValue: (val: string) => void;
}

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-input": {
      height: "12px",
    },
  },
});

export const TableHeader = memo(({ value, setValue }: TableHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      m={2}
    >
      <Typography variant="h6" textAlign="center">
        Products Table
      </Typography>
      <Box>
        <CssTextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Typography color="grey" fontSize={10} textAlign="center">
          (By Title, Category, Brand, Availability)
        </Typography>
      </Box>
    </Stack>
  );
});
