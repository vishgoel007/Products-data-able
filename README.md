## Prerequisites

- Node.js (v20 or higher recommended)
- npm as package manager

---

## Running the Project Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishgoel007/Products-data-able.git
   cd Products-data-able

   npm install

   npm run dev

##  Features

- Display products in a tabular format.
- Sorting:
  - Single column sorting.
  - Multi column sorting (click multiple headers).
  - Empty/null values always sort last.
- Filtering:
  - Category multi select dropdown.
  - Rating slider (min rating).
  - Clear all filters button.
- Search:
  - Case insensitive search across Title, Brand, Category, Availability.
- Pagination:
  - Client side pagination with rows per page selector.
- Error handling:
  - Retry button on failure.
- Loading state:
  - Shimmer placeholders.
- Responsive Layout using Material UI.


## Tech Stack

- React 18 with Vite
- TypeScript
- Material UI (MUI) components
- Lodash for sorting/filtering utilities


## Future Enhancements

- Server side pagination and sorting using API parameters.
- Additional filter options (price range, discount range, etc.).
- Column management (visibility toggling, resizing, and reordering).
- Unit and integration tests.
- Filter chips for all active filters with quick remove actions.
- Highlight matched substrings in table cells to improve scanability on large datasets.
- Accessibility improvements and Internationalization.
- Virtualized rendering for large data.
- Persist filters, sort order, and pagination state in the URL.