# Accessibility Testing and Remediation Workflow

## MANDATORY WORKFLOW - DO NOT DEVIATE

**This workflow applies to ANY UI code generation or modification — not only when accessibility is explicitly requested.** Whenever you create, modify, or refactor user-facing UI (new components, new pages, edits to existing components), you MUST follow this exact workflow before considering the task complete:

### 1. Analysis Phase

When asked to analyze pages for accessibility issues, you MUST:

- Use the `mcp_axe-mcp-server_analyze` tool to scan the page
- Do NOT manually identify accessibility issues
- Always provide the complete URL being analyzed

### 2. Remediation Phase

When asked to remediate or fix accessibility issues, you MUST:

- First use `mcp_axe-mcp-server_remediate` tool for EACH violation found
- Provide the exact HTML element, rule ID, and issue description
- Review the remediation guidance before making any code changes
- Apply fixes based on the remediate tool's recommendations
- Do NOT manually fix accessibility issues without first using the remediate tool

#### When remediating an img without alt issue...

- Avoid describing which component/area the image itself is in (e.g., "Hero banner showing a scenic train and the text 'Book Your Journey'"), instead focus solely on the informative aspects of the image itself (e.g., "Book Your Journey")

### 3. Verification Phase

After applying fixes, you MUST:

- Re-run `mcp_axe-mcp-server_analyze` to verify all issues are resolved
- Confirm zero violations before considering the task complete

## Required Workflow Example:

```
1. mcp_axe-mcp-server_analyze → Find violations
2. For each violation: mcp_axe-mcp-server_remediate → Get fix guidance
3. Apply recommended fixes to code
4. mcp_axe-mcp-server_analyze → Verify fixes
```

## Enforcement

- NEVER skip the remediate tool when fixing accessibility issues
- ALWAYS use both analyze and remediate tools as specified
- This workflow ensures proper accessibility best practices and compliance

## Trip card image alt text

Images sourced from `public/trips/*.svg` are destination scenes with overlaid **service icons** (express, sleeper, dining, etc.) that visually communicate which train services are included with the trip or deal. The destination, route, fare, and dates are already rendered as adjacent card text — they must NOT be repeated in the alt.

When generating alt text for an `<img>` whose `src` resolves to a `public/trips/*.svg` file, you MUST:

1. Open the corresponding SVG file and locate the `<!-- Service icon: ... -->` comments. Each comment identifies one service depicted in the image.
2. Write alt text describing ONLY those service icons, in plain language. Examples:
   - SVG contains express and dining icons → `alt="Express service and dining service"`
   - SVG contains sleeper and dining icons → `alt="Sleeper service and dining service"`
   - SVG contains only the dining icon → `alt="Dining service"`
3. Do NOT include the destination name, route, scenery, time of day, weather, or any other detail that does not appear as a service icon in the SVG.
