# Code guidelines

- Do not add unnecessary comments - only add comments to explain tricky logic
- Prefer using tailwind tokens, over custom values. If required, add these custom tokens into `globals.css` to ensure reusability
- Prefer `type` over `interface`
- Prefer omitting function return types, and let typescript infer return types
- When combining classnames, use the `cn` package's `cn` function
- Avoid em-dashes - Prefer normal dashes instead
