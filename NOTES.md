## TODO:

- ask wilco about why our intentional "Promo code raw `<input>` — no label/aria" issue isn't raised by linter
- figure out if we want to keep the icon button mappings in axe-linter.yml

## Intentional A11y Issues

| Issue                                                                 | Location                 | Act                           | Tool           |
| --------------------------------------------------------------------- | ------------------------ | ----------------------------- | -------------- |
| Hero banner `<img>` — no `alt` attribute                              | `HeroBanner.tsx`         | Act 1: Axe Linter             | axe Linter     |
| Navbar search `IconButton` — no accessible name (show axe-linter.yml) | `Navbar.tsx`             | Act 1: Axe Linter             | axe Linter     |
| Promo code raw `<input>` — no label/aria                              | `BookingForm.tsx`        | Act 1: Axe Linter             | axe Linter     |
| From/To/Departure `<TextInput>` — no `label` prop                     | `BookingForm.tsx`        | Act 2: Axe MCP Server         | axe MCP Server |
| Helper text `#9ca3af` — contrast failure                              | `BookingForm.tsx`        | Act 2: Axe MCP Server         | axe MCP Server |
| Clear form `IconButton` — no accessible name                          | `BookingForm.tsx`        | Act 2: Axe MCP Server         | axe MCP Server |
| "Plan Your Trip" — `<div>`, no heading role                           | `BookingForm.tsx`        | Act 3: Axe DevTools Extension | Advanced Rules |
| Promo code — focus ring suppressed, no replacement                    | `BookingForm.tsx`        | Act 3: Axe DevTools Extension | Advanced Rules |
| PassengerCounter `+` button — focus ring suppressed                   | `PassengerCounter.tsx`   | Act 3: Axe DevTools Extension | Advanced Rules |
| SVG `<text>` "Book Your Journey" baked into image — marked decorative | `public/hero-banner.svg` | Act 3: Axe DevTools Extension | Advanced Rules |
| PassengerCounter — bare "Increase"/"Decrease" labels                  | `PassengerCounter.tsx`   | Act 3: Axe DevTools Extension | Automated IGT  |
| Search `aria-label="{LABEL TEXT HERE}"` garbage value                 | `Navbar.tsx`             | Act 3: Axe DevTools Extension | Automated IGT  |
| "Search Trains" — `<div>`, no role/tabIndex/keyboard                  | `BookingForm.tsx`        | Act 3: Axe DevTools Extension | Automated IGT  |
