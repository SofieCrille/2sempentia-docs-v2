# Git & Branching

Versionsstyring håndteres med Git, og koden hostes på GitHub.

## Branching-strategi

Hver afgrænset opgave laves på en feature branch og merges via pull request
til `main`.

Branches navngives efter mønsteret `type/kort-beskrivelse`:

| Præfiks   | Brug                                |
|-----------|-------------------------------------|
| feature/  | Nye funktioner                      |
| fix/      | Fejlrettelser                       |
| refactor/ | Omstrukturering uden adfærdsændring |
| docs/     | Dokumentationsændringer             |
| chore/    | Vedligeholdelse                     |
| ci/       | Ændringer i pipeline og workflows   |
| test/     | Test-relaterede ændringer           |

Eksempel: `refactor/auth-showcase`.

## Commit-konvention

Commits følger Conventional Commits. Hver besked starter med et præfiks,
der beskriver typen af ændring:

| Præfiks    | Brug                                                        |
|------------|-------------------------------------------------------------|
| feat:      | Nye funktioner                                              |
| fix:       | Fejlrettelser                                               |
| docs:      | Dokumentationsændringer                                     |
| style:     | Formatering, indrykning, semikoloner (ingen kode-ændringer) |
| refactor:  | Omstrukturering uden adfærdsændring                         |
| test:      | Tilføjelse eller ændring af tests                           |
| chore:     | Vedligeholdelse, pakke-opdateringer, småting                |
| ci:        | Ændringer i pipeline og workflows                           |
| perf:      | Performance-forbedringer                                    |
| build:     | Ændringer i build-system eller afhængigheder                |
| revert:    | Rul en tidligere commit tilbage                             |

Eksempler:

\`\`\`
feat: tilføj login-side
docs: tilføj jsdoc til auth-store
test: tilføj unit tests for auth-store
refactor: saml rollelogik i auth-store
ci: tilføj github actions workflow
\`\`\`

Historikken kan filtreres på type:

\`\`\`bash
git log --grep="refactor:"
\`\`\`

## CI/CD

To workflows kører automatisk:

**`ci.yml`** — kører ved hvert push og hver pull request:

1. ESLint
2. Vitest unit tests med coverage
3. SonarCloud-analyse
4. Snyk-sårbarhedsscanning

**`docs.yml`** — kører ved push til `main`:

1. Genererer JSDoc-dokumentation
2. Publicerer til GitHub Pages