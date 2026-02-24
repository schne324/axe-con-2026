# Shift Left Without Shifting Gears — Talk Storyboard

---

## Intro & Agenda (slides)

- Bio, role at Deque, accessibility meetup
- Quick agenda overview

---

## The Setup (browser)

- Pull up the GitHub ticket: `feat: add traveler selection to booking form`
- **Punchline:** _"I just got assigned this ticket. Let's build it. But first — let me show you what we're working with."_
- Quick tour of Casey Jones Railway Co. in the browser
  - Booking form, navbar, hero banner — looks like a real app
- Quick tech stack slide: Vite + React + TS + Tailwind, local shared components
- **Punchline:** _"Casey Jones was famous for always arriving on time. Today we're going to make sure our app doesn't leave anyone behind."_

---

## ACT 1: Axe Linter — "The Wrist Slapper"

> **Transition:** _"Let's crack open the code. I want to walk you through how this thing is structured before I start building."_

- Switch to VS Code, open file explorer, start walking through components
- Open `HeroBanner.tsx`
  - **Stumble:** _"Oh. Already."_
  - Linter flagging missing `alt` on the `<img>`
  - Fix it: add `alt=""`
  - **Punchline:** _"I'll mark this as decorative for now — it's just a banner image."_
  - ⚠️ **Plant the seed:** _"We'll come back to this one later..."_
- Open `Navbar.tsx`
  - Linter flagging search icon button — no accessible name
  - Fix it: add `aria-label="Search"` to the button
  - Linter flagging "New Deals" link — `aria-hidden` on inner span
  - **Punchline:** _"Classic move — someone hid the text from assistive tech but left it visible. Screen reader gets nothing."_
  - Fix it: remove `aria-hidden` from the span
- **Pause and reflect:** _"Notice what just happened — I didn't run a scan, I didn't switch tools, I didn't leave my editor. Linter caught these as I was reading the code. That's shift left."_
- **Mention:** _"Axe Linter also supports custom component mappings via `axe-linter.yml` — you can teach it the internals of your own components."_

---

## LIVE CODING: The Ticket

> **Transition:** _"Alright — let's actually do the work I was assigned."_

- Open `BookingForm.tsx`
- Pull up the ticket on screen briefly for reference
- Wire in state: `adults`, `children`
- Drop in the Travelers section heading
- Instantiate two `<PassengerCounter />` components:
  - `<PassengerCounter label="Adults" count={adults} onIncrease={...} onDecrease={...} />`
  - `<PassengerCounter label="Children" count={children} onIncrease={...} onDecrease={...} />`
- Save, flip to browser — Travelers section renders, +/- buttons work
- **Punchline:** _"Ticket done. AC met. I could push this right now..."_
- **Beat.** _"...but let's not."_

<details>

  <summary>Actual code changes to make...</summary>

## LIVE CODING CHEAT SHEET

> Keep this section visible on your second monitor during the live coding segment.

### 1. State — add to top of `BookingForm.tsx`

```tsx
const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);
```

### 2. Import — make sure `PassengerCounter` is imported

```tsx
import PassengerCounter from "../shared/PassengerCounter";
```

### 3. JSX — drop into the form after the Departure Date field

```tsx
<div>
  <p className="text-sm font-medium text-gray-700 mb-2">Travelers</p>
  <div className="border border-gray-200 rounded-xl px-4">
    <PassengerCounter
      label="Adults"
      count={adults}
      onIncrease={() => setAdults((n) => n + 1)}
      onDecrease={() => setAdults((n) => Math.max(1, n - 1))}
    />
    <PassengerCounter
      label="Children"
      count={children}
      onIncrease={() => setChildren((n) => n + 1)}
      onDecrease={() => setChildren((n) => Math.max(0, n - 1))}
    />
  </div>
</div>
```

</details>

---

## ACT 2: Axe MCP Server — "The Code-Time Copilot"

> **Transition:** _"Before I push this branch, I want to make sure what I just shipped — and what was already there — is actually accessible. And I want to do that without leaving VS Code."_

- Open `mcp.json`
- **Punchline:** _"Here's literally everything it took to get axe MCP Server talking to Copilot. A name, a command, one arg. The Docker flags are just plumbing — telling the container how to reach my localhost. You copy this once from the docs, drop in your API key, and never think about it again."_
- Close the config, open Copilot chat
- Type the prompt:
  ```
  #analyze http://localhost:5173/ web page for accessibility issues and #remediate each violation found
  ```
- **Narrate while it runs:**
  - Color contrast on the helper text — _"Yep, that gray on white. Knew it looked a little light."_
  - Unlabeled TextInput components — _"There it is. Linter couldn't see inside our components. MCP rendered the page and found them immediately."_
  - Clear form icon button — no accessible name — _"Same story — custom component, linter had no idea."_
  - Watch Copilot propose and apply fixes
- **Punchline:** _"I didn't write a single fix. The agent found them, reasoned about them, and remediated them. Still haven't left my editor."_
- Quick visual check in the browser — form still looks right, fixes landed
- **Mention:** _"Everything MCP just found? Those are standard axe-core rules — the same engine powering axe DevTools, the same engine you can run in CI. Consistent results across your whole pipeline."_

---

## ACT 3: Axe DevTools Extension — "The Browser's Truth"

> **Transition:** _"MCP got us really far. But there's a class of issues that only reveal themselves in a fully rendered, interactive browser. Let's go deeper."_

### Advanced Rules Scan

- Switch to Chrome, open axe DevTools Extension
- Run the advanced rules scan
- **Hero banner payoff:** Advanced rule flags the image as informative despite `alt=""`
  - **Punchline:** _"Remember back in Act 1 when I 'fixed' this? Turns out I made it worse. The image has 'Book Your Journey' baked right into the pixels — it's not decorative at all. The browser knows what I didn't."_
  - Fix it: add a proper descriptive alt
- Focus indicator missing on promo code input and passenger counter button
  - Tab through the form live — watch the focus ring vanish
  - **Punchline:** _"Keyboard users just... lose track of where they are. That's a real barrier."_
  - Fix: remove `outline-none` overrides
- "Plan Your Trip" div flagged — looks and acts like a heading, isn't one
  - **Punchline:** _"Visually it's an h2. Semantically it's nothing. Screen reader users don't get that section landmark."_
  - Fix: swap to `<h2>`

### Automated Interactive Elements IGT

> **Transition:** _"Now let's run something that goes beyond rules. The automated IGT uses AI to analyze interactive elements in context — not just whether they have an accessible name, but whether that name actually makes sense."_

- Run the Interactive Elements IGT
- Passenger counter buttons flagged — bare "Increase" / "Decrease" names
  - **Punchline:** _"I wrote these. Live. In front of you. Twenty minutes ago. And I didn't think twice about it — because 'Increase' and 'Decrease' sound fine until you imagine three identical pairs of them on a page and a screen reader user trying to figure out which one is which."_
  - IGT suggests: "Increase number of adults", "Decrease number of children" etc.
  - Fix and re-run to confirm resolved
- "Search Trains" div flagged — no role, no keyboard access
  - **Punchline:** _"Looks like a button. Clicks like a button. Isn't a button. Mouse users are fine. Keyboard users are stuck."_
  - Fix: swap to `<button>`
- Search input flagged — `aria-label="{LABEL TEXT HERE}"`
  - **Punchline:** _"Someone shipped a template. The AI didn't just flag it as invalid — it noticed there's a perfectly good visible label right there and suggested we associate them properly and ditch the garbage value."_
  - Fix: associate the visible label via `htmlFor`, remove the bad `aria-label`

---

## THE COMMIT

- Switch to terminal
- **Punchline:** _"Alright. Casey Jones always arrived on time. Let's ship."_
- ```
  git add .
  git commit -m "fix: a11y issues caught by axe tooling — linter, MCP, and DevTools"
  git push
  ```

---

## WRAP UP SLIDES

- Recap the three layers:
  - **Axe Linter** — catches issues as you write code, zero context switching
  - **Axe MCP Server** — renders your page, finds what linter can't, fixes with AI
  - **Axe DevTools Extension** — browser truth, advanced rules, intelligent IGT
- _"These aren't three separate workflows. They're one workflow at three depths."_
- Free tools: axe Linter for VS Code, axe DevTools free tier
- Premium: axe MCP Server, axe DevTools advanced rules + IGT
- **Final punchline:** _"Shift left without shifting gears. Leave your troubles — and your accessibility debt — behind."_
- Questions

---

## TIMING GUIDE

| Section                       | Target     |
| ----------------------------- | ---------- |
| Intro & setup slides          | 5 min      |
| Act 1: Axe Linter             | 8 min      |
| Live coding: ticket           | 5 min      |
| Act 2: Axe MCP Server         | 10 min     |
| Act 3: Axe DevTools Extension | 10 min     |
| Commit + wrap up              | 2 min      |
| **Total**                     | **40 min** |

---

## QUICK REFERENCE — Issues by Act

| Issue                                                 | Location                 | Act                           | Tool           |
| ----------------------------------------------------- | ------------------------ | ----------------------------- | -------------- |
| Hero banner `<img>` — no `alt` attribute              | `HeroBanner.tsx`         | Act 1: Axe Linter             | axe Linter     |
| Navbar search icon button — no accessible name        | `Navbar.tsx`             | Act 1: Axe Linter             | axe Linter     |
| "New Deals" link — `aria-hidden` on inner span        | `Navbar.tsx`             | Act 1: Axe Linter             | axe Linter     |
| From/To/Departure `<TextInput>` — no `label` prop     | `BookingForm.tsx`        | Act 2: Axe MCP Server         | axe MCP Server |
| Helper text `#9ca3af` — contrast failure              | `BookingForm.tsx`        | Act 2: Axe MCP Server         | axe MCP Server |
| Clear form `IconButton` — no accessible name          | `BookingForm.tsx`        | Act 2: Axe MCP Server         | axe MCP Server |
| "Plan Your Trip" — `<div>`, no heading role           | `BookingForm.tsx`        | Act 3: Axe DevTools Extension | Advanced Rules |
| Promo code — focus ring suppressed, no replacement    | `BookingForm.tsx`        | Act 3: Axe DevTools Extension | Advanced Rules |
| PassengerCounter `+` button — focus ring suppressed   | `PassengerCounter.tsx`   | Act 3: Axe DevTools Extension | Advanced Rules |
| SVG `<text>` "Book Your Journey" — marked decorative  | `public/hero-banner.svg` | Act 3: Axe DevTools Extension | Advanced Rules |
| PassengerCounter — bare "Increase"/"Decrease" labels  | `PassengerCounter.tsx`   | Act 3: Axe DevTools Extension | Automated IGT  |
| Search `aria-label="{LABEL TEXT HERE}"` garbage value | `Navbar.tsx`             | Act 3: Axe DevTools Extension | Automated IGT  |
| "Search Trains" — `<div>`, no role/tabIndex/keyboard  | `BookingForm.tsx`        | Act 3: Axe DevTools Extension | Automated IGT  |
