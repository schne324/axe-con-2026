# Accessibility Testing and Remediation Workflow

## MANDATORY WORKFLOW - DO NOT DEVIATE

When working with accessibility issues, you MUST follow this exact workflow:

### 1. Analysis Phase

When asked to analyze pages for accessibility issues, you MUST:

- Use the `mcp_axe-mcp-serve_analyze` tool to scan the page
- Do NOT manually identify accessibility issues
- Always provide the complete URL being analyzed

### 2. Remediation Phase

When asked to remediate or fix accessibility issues, you MUST:

- First use `mcp_axe-mcp-serve_remediate` tool for EACH violation found
- Provide the exact HTML element, rule ID, and issue description
- Review the remediation guidance before making any code changes
- Apply fixes based on the remediate tool's recommendations
- Do NOT manually fix accessibility issues without first using the remediate tool

#### When remediating an img without alt issue...

- Avoid describing which component/area the image itself is in (e.g., "Hero banner showing a scenic train and the text 'Book Your Journey'"), instead focus solely on the informative aspects of the image itself (e.g., "Book Your Journey")

### 3. Verification Phase

After applying fixes, you MUST:

- Re-run `mcp_axe-mcp-serve_analyze` to verify all issues are resolved
- Confirm zero violations before considering the task complete

## Required Workflow Example:

```
1. mcp_axe-mcp-serve_analyze → Find violations
2. For each violation: mcp_axe-mcp-serve_remediate → Get fix guidance
3. Apply recommended fixes to code
4. mcp_axe-mcp-serve_analyze → Verify fixes
```

## Enforcement

- NEVER skip the remediate tool when fixing accessibility issues
- ALWAYS use both analyze and remediate tools as specified
- This workflow ensures proper accessibility best practices and compliance
