# Milton Huse Byggeportal
En webapplikation udviklet i samarbejde med Pentia og Digital Konceptudvikling.
Applikationen giver private kunder mulighed for at følge deres eget byggeprojekt hos Milton Huse i realtid med statusopdateringer, billeder og kommunikation med byggeleder.

## Teknologi

| Teknologi | Version | Beskrivelse |
|-----------|---------|-------------|
| Vue.js | ^3.5.30 | Frontend framework |
| Vue Router | ^5.0.3 | Routing og route guards |
| Pinia | ^3.0.4 | State management |
| Firebase | ^12.11.0 | Auth, Firestore, Storage |
| Vite | ^7.3.1 | Build tool |
| Sass | ^1.98.0 | CSS preprocessor |
| Vitest | ^4.0.18 | Unit tests |
| Cypress | ^15.13.0 | E2E tests |
| ESLint | ^10.0.3 | Linting |

## Links

- **Demo**: [Firebase Hosting](#)
- **GitHub Repository**: [Link](#)
- **Dokumentation**: [Link](#)

## Login til demo

- **Email**: 
- **Adgangskode**: 

## Installation

### 1. Installer afhængigheder

```sh
npm install
```

### 2. Konfigurer Firebase

Opret en Firebase-projekt og tilføj dine konfigurationer i `.env`:

```javascript
const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "dit-projekt.firebaseapp.com",
  projectId: "dit-projekt",
  storageBucket: "dit-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```


### 3. Start udviklingsserver

```sh
npm run dev
```

Applikationen kører nu på `http://localhost:5173`

## Tilgængelige scripts

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start udviklingsserver med hot-reload |
| `npm run build` | Build og minificer til produktion |
| `npm run preview` | Preview produktionsbuild lokalt |
| `npm run deploy` | Build og deploy til Firebase Hosting |
| `npm run test:unit` | Kør unit tests med Vitest |
| `npm run test:e2e:dev` | Kør E2E tests mod dev-server |
| `npm run lint` | Lint alle JS og Vue filer |

## Projektstruktur

```
src/
├── assets/scss/          # SCSS stylesheets
│   ├── abstracts/       # Variabler og mixins
│   └── components/     # Komponent-specifikke styles
├── components/          # Genbrugelige Vue komponenter
│   ├── layout/         # Layout komponenter
│   └── *.vue           # Basis komponenter
├── router/              # Vue Router konfiguration
├── stores/              # Pinia stores
│   ├── auth.js         # Auth store
│   └── project.js     # Project store
├── views/               # Side-komponenter
│   ├── customer/       # Kunde-visninger
│   ├── login/          # Login-visninger
│   └── manager/        # Manager-visninger
├── App.vue              # Root komponent
├── firebase.js          # Firebase konfiguration
└── main.js              # App entry point
```

## Udvikling

### Kør tests

```sh
# Unit tests
npm run test:unit

# E2E tests (mod dev-server)
npm run test:e2e:dev
```

### Lint kode

```sh
npm run lint
```
