# 🧭 Coding Conventions for Sports Leagues SPA

These rules guide development in a consistent, scalable, and performant way for the single-page application that consumes the All Leagues API and displays sports leagues with filtering options.

---

## 📁 Folder Structure


| Folder        | Purpose                         |
| ------------- | ------------------------------- |
| `components/` | Reusable UI components          |
| `services/`   | API calls and caching logic     |
| `hooks/`      | Custom React hooks              |
| `helpers/`    | Pure utility functions          |
| `types/`      | TypeScript interfaces and types |


---

## Component Conventions

- Use **functional components** with React Hooks in all components.
- Component names must be in **PascalCase**.
- All `props` must be typed with TypeScript interfaces.
- Use `React.FC<PropsType>` or explicit function typing.
- Avoid large components — break them into smaller parts if they exceed 100–150 lines.
- Export components as default: `export default ComponentName;`

---

## TypeScript Guidelines

- Define all props interfaces in `src/types/index.ts`.
- Use explicit return types for functions: `async (): Promise<League[]>`
- Prefer type inference for simple cases: `const [loading, setLoading] = useState(true);`
- Use `type` for unions and primitives, `interface` for object shapes.

---

## CSS Guidelines

- Use **custom CSS** with CSS variables for theming.
- Define all colors, spacing, and design tokens in `:root`.
- Use **rem** units for font sizes and spacing (accessibility).
- Use **px** only for borders, shadows, and fixed dimensions.
- Follow mobile-first responsive design with media queries.
- Class names should be descriptive and kebab-case: `.league-item`, `.sport-badge`

---

## Performance Rules

- **Use** `key` **prop in all** `.map()` **iterations** — prefer unique IDs over indices.
- **Memoize expensive calculations** with `useMemo`.
- **Memoize callback functions** with `useCallback`.
- **Memoize list item components** with `React.memo`.
- **Lazy load heavy components** with `React.lazy()` and `Suspense`.
- **Debounce user input** (search, filters) to reduce re-renders.
- **Cache API responses** in service layer using `Map` or similar.
- Optimize rendering of long lists (consider virtualization if >100 items).

---

## Services Layer

- All API calls should be centralized in the `services/` folder.
- **Cache API responses** to avoid unnecessary network requests.
- Export pure async functions, not classes.

---

## Responsive UI

- The layout must work across mobile (320px+), tablet (768px+), and desktop (1024px+).
- Use **mobile-first** media queries: start with mobile styles, add breakpoints for larger screens.
- Common breakpoints:
  - `@media (max-width: 480px)` — Small phones
  - `@media (max-width: 768px)` — Tablets
  - `@media (max-width: 1024px)` — Small laptops
- Avoid fixed widths unless necessary — use `max-width` with percentage widths.
- Test on actual devices or Chrome DevTools responsive mode.

---

## Code Organization Tips

- Keep each component focused on a single responsibility.
- Extract complex logic into custom hooks or helper functions.
- Use helper functions for pure data transformations.
- Use early returns to reduce nesting.

---

### APIs:

- **All Leagues:** `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Season Badges:** `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<league_id>`

---

**Goal:** Clean, maintainable, performant React SPA with TypeScript, consistent architecture, and reusable logic.