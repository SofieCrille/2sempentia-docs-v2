# Teknisk Arkitektur

Applikationen er en Single Page Application (SPA) bygget i Vue 3 med
Firebase som backend.

## Teknologi-stack

| Lag        | Teknologi                          |
|------------|------------------------------------|
| Frontend   | Vue 3, Vue Router, Pinia, SCSS     |
| Backend    | Firebase Auth, Firestore, Storage  |
| Test       | Vitest, Cypress                    |
| Kvalitet   | ESLint, SonarCloud, Snyk           |
| CI/CD      | GitHub Actions                     |
| Hosting    | Firebase Hosting, GitHub Pages     |

## MVVM-mønster

Applikationen følger MVVM, der adskiller data, logik og visning:

| Lag        | Implementering                                         |
|------------|--------------------------------------------------------|
| Model      | Firebase Firestore og Firebase Auth                    |
| View       | Vue-komponenter                                        |
| ViewModel  | Pinia-stores                                           |

Komponenter kalder aldrig Firebase direkte, men går altid gennem en store.
Det samler datalogikken ét sted og adskiller den fra visningen.

## Mappestruktur

\`\`\`
src/
├── assets/scss/      # SCSS
├── components/       # Genbrugelige komponenter (base, feature, layout)
├── composables/      # Genbrugt Vue-tilknyttet logik
├── config/           # Statisk data (navigation mv.)
├── router/           # Routing og navigation guards
├── stores/           # State management med Pinia
├── utils/            # Rene hjælpefunktioner
└── views/            # Sider, opdelt efter rolle
\`\`\`

## Komponentlag

Komponenter er placeret i tre lag efter abstraktionsniveau:

| Lag          | Ansvar                                                       |
|--------------|--------------------------------------------------------------|
| base         | Generelle byggeklodser uden domæne-kendskab (BaseButton, BaseInput) |
| feature      | Domænespecifikke komponenter (PhaseCard, ChatPanel)          |
| layout       | Faste rammer omkring siderne (MobileLayout, DetailLayout)    |

Feature-komponenter bygges af base-komponenter, og views bygges af
feature-komponenter inden i et layout.

## Routing

Vue Router håndterer navigation med client-side routing. Hver rute har
en `meta`-property, der bestemmer hvilket layout der bruges, og hvilken
rolle der kræves for at tilgå den.

En global navigation guard tjekker ved hver navigation:

1. Er brugeren logget ind?
2. Matcher brugerens rolle rutens krav?

Hvis ikke, omdirigeres brugeren til login eller deres egen forside.

## State management

Pinia bruges som central state manager med én store pr. feature:

| Store    | Ansvar                                          |
|----------|-------------------------------------------------|
| auth     | Bruger, rolle og autentificering                |
| project  | Projekter og oprettelse                         |
| phase    | Faser og kommentarer                            |
| chat     | Beskeder mellem manager og customer             |
| document | Dokumenter og filer                             |

Komponenter tilgår data og actions via storens `useXxxStore()`.