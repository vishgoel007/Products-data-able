import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useCallback, memo } from "react";
import type { Filters } from "../types/product";
import { Button } from "@mui/material";

interface TableFilterProps {
  filters: Filters;
  setFilters: (updatedFilters: Filters) => void;
  categories: string[];
}

interface RatingFilterProps {
  minRating: Filters["minRating"];
  handleRatingChange: (e: Event, value: number) => void;
}

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: Filters["categories"];
  handleCategoryChange: (event: SelectChangeEvent<string[]>) => void;
}

const sliderMarks = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const RatingFilter = memo(
  ({ minRating, handleRatingChange }: RatingFilterProps) => {
    return (
      <Stack sx={{ width: 250, px: 2 }}>
        <Typography>Rating Filter</Typography>
        <Slider
          sx={{ mb: 1 }}
          aria-label="Rating"
          value={minRating ?? 0}
          onChange={handleRatingChange}
          marks={sliderMarks}
          step={0.5}
          min={0}
          max={5}
          valueLabelDisplay="auto"
        />
      </Stack>
    );
  }
);

export const CategoryFilter = memo(
  ({
    categories,
    selectedCategories,
    handleCategoryChange,
  }: CategoryFilterProps) => {
    return (
      <FormControl
        size="small"
        sx={{ minWidth: 220, width: 300, alignSelf: "center" }}
      >
        <Typography pb={0.5}>Category Filter</Typography>
        <Select
          id={"category-filter"}
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Categories...</em>;
            }
            return (
              <Box
                display="flex"
                gap={0.5}
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {selected.slice(0, 2).map((sel) => (
                  <Chip key={sel} label={sel} size="small" />
                ))}
                {selected.length > 2 && (
                  <Box component="span">+{selected.length - 2}</Box>
                )}
              </Box>
            );
          }}
          displayEmpty
        >
          {categories.map((category) => {
            const checked = selectedCategories.includes(category);
            return (
              <MenuItem key={category} value={category}>
                <Checkbox checked={checked} />
                <ListItemText primary={category} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
);

export const TableFilter = memo(
  ({ filters, setFilters, categories }: TableFilterProps) => {
    const handleCategoryChange = useCallback(
      (event: SelectChangeEvent<typeof categories>) => {
        const {
          target: { value },
        } = event;
        const selected = typeof value === "string" ? value.split(",") : value;
        setFilters({
          ...filters,
          categories: selected,
        });
      },
      [filters, setFilters]
    );

    const handleRatingChange = useCallback(
      (_: Event, value: number) => {
        setFilters({
          ...filters,
          minRating: value,
        });
      },
      [filters, setFilters]
    );

    const handleClearAll = () => {
      setFilters({
        categories: [],
        minRating: null,
      });
    };

    return (
      <Stack m={2} gap={4} direction="row">
        <CategoryFilter
          categories={categories}
          selectedCategories={filters.categories}
          handleCategoryChange={handleCategoryChange}
        />

        <RatingFilter
          minRating={filters.minRating}
          handleRatingChange={handleRatingChange}
        />
        <Button onClick={handleClearAll} sx={{ alignSelf: "center" }}>
          Clear All
        </Button>
      </Stack>
    );
  }
);
