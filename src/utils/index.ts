import type {
  Filters,
  Product,
  SortDescriptor,
  SortDir,
} from "../types/product";
import { orderBy, isNumber, filter, some, toLower } from "lodash";

export function filterProducts(
  products: Product[],
  searchQuery: string | null,
  filters: Filters
): Product[] {
  const query = searchQuery?.trim().toLowerCase() || "";

  const hasQuery = query.length > 0;
  const hasCategoryFilter = filters.categories.length > 0;
  const hasMinRating = isNumber(filters?.minRating);

  return filter(products, (p) => {
    if (hasCategoryFilter && !filters.categories.includes(p.category ?? "")) {
      return false;
    }

    if (
      hasMinRating &&
      !(isNumber(p.rating) && p.rating >= (filters!.minRating as number))
    ) {
      return false;
    }

    if (hasQuery) {
      const match = some(
        [p.title, p.brand, p.category, p.availabilityStatus],
        (val) => (val ?? "").toString().toLowerCase().includes(query)
      );
      if (!match) return false;
    }

    return true;
  });
}

const isNilOrBlank = (val: unknown) =>
  val == null || (typeof val === "string" && val.trim() === "");

const getSortValue = (val: string | number | null | undefined) => {
  if (typeof val === "number") return val;
  return toLower(String(val ?? ""));
};

type LodashOrder = Exclude<SortDir, undefined> | boolean;

export function sortProductsByField(
  rows: Product[],
  sort: SortDescriptor[]
): Product[] {
  if (!sort?.length || rows.length <= 1) return rows;

  const iterates: Array<(row: Product) => string | number> = [];
  const orders: Array<SortDir> = [];

  sort.forEach(({ field, dir }) => {
    iterates.push((row) => (isNilOrBlank(row[field]) ? 1 : 0));
    orders.push("asc");

    iterates.push((row) => getSortValue(row[field]));
    orders.push(dir);
  });

  return orderBy(rows, iterates, orders as unknown as LodashOrder);
}

const nextDir = (prev?: SortDir): SortDir | undefined => {
  if (!prev) return "asc";
  if (prev === "asc") return "desc";
  return undefined;
};

export const toggleSort = (
  prevSort: SortDescriptor[],
  field: keyof Product
): SortDescriptor[] => {
  const idx = prevSort.findIndex((s) => s.field === field);
  const curDir = idx >= 0 ? prevSort[idx].dir : undefined;
  const dir = nextDir(curDir);

  if (idx === -1) return dir ? [...prevSort, { field, dir }] : prevSort;

  const copy = [...prevSort];

  if (!dir) {
    copy.splice(idx, 1);
    return copy;
  }

  copy[idx] = { field, dir };
  return copy;
};
