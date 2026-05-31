# Test & Kvalitet

Applikationen testes på to niveauer: unit tests for isoleret logik og
E2E tests for hele brugerflows.

## Værktøjer

| Værktøj   | Formål                                            |
|-----------|---------------------------------------------------|
| Vitest    | Unit tests af stores og utility-funktioner        |
| Cypress   | End-to-end tests af brugerflows i browseren       |
| ESLint    | Statisk kodeanalyse                               |
| SonarCloud| Kodekvalitet (bugs, code smells, coverage)        |
| Snyk      | Sårbarhedsscanning af afhængigheder               |

## Unit tests

Unit tests ligger i `src/test/` og kører isolerede dele af kodebasen,
typisk Pinia-stores og utility-funktioner. Eksterne afhængigheder
mockes med `vi.mock()`.

Kør unit tests:

\`\`\`bash
npm run test:unit
\`\`\`

| Test-fil          | Dækker                                          |
|-------------------|-------------------------------------------------|
| auth.test.js      | Auth-storens getters, logout og fejlhåndtering  |
| date.test.js      | Dato-formatering                                |

## E2E tests

E2E tests ligger i `cypress/e2e/` og simulerer reelle brugerflows
i en rigtig browser. Tests er opdelt pr. rolle for at undgå
sessions-konflikter.

Kør E2E tests:

\`\`\`bash
npm run test:e2e:dev
\`\`\`

| Test-fil       | Dækker                                            |
|----------------|---------------------------------------------------|
| manager.cy.js  | Login, navigation, settings, logout som manager   |
| customer.cy.js | Login som customer, blokering af manager-ruter    |

## Coverage

Coverage-rapport genereres automatisk ved unit tests og sendes til
SonarCloud, hvor den vises sammen med øvrige kvalitetsmetrikker.

\`\`\`bash
npm run test:unit -- --coverage
\`\`\`

## Automatisering

Alle unit tests og statiske analyser kører automatisk i CI-pipelinen
ved hvert push og hver pull request. Se [Git & Branching](./tutorial-02-git-branching.html)
for detaljer om workflowen.