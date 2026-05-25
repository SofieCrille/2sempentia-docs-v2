# Milton Huse Byggeportal

En webapplikation udviklet i samarbejde med Pentia og Digital Konceptudvikling.  
Applikationen giver private kunder mulighed for at følge deres eget byggeprojekt hos Milton Huse i realtid med statusopdateringer, billeder og kommunikation med byggeleder.

---

## 1. Projektoversigt

Dette projekt er en digital byggeportal, der brobygger kommunikationen mellem Milton Huses byggeledere (Manager) og de private bygherrer (Customers). Portalen sikrer gennemsigtighed i byggeprocessen gennem rollespecifikke dashboards og workflows.

### Nøglefunktioner:
* Byggeleder (Manager): Kan administrere flere byggeprojekter sideløbende, opdatere projektstatus, uploade billeder og dokumentation til Firestore, samt sende direkte beskeder til kunden.
* Privatkunde (Customer): Har adgang til et personligt dashboard, hvor de i realtid kan følge byggeriets faser, se uploadede billeder af deres hus, og kommunikere med deres tildelte byggeleder.
* Sikkerhed & Rettigheder: Klient-side Route Guards i Vue Router sikrer i samspil med Firebase Authentication, at brugere kun kan tilgå de ruter og data, de har rettigheder til.

### Teknologisk Stack:
* Frontend: Vue.js 3 (Composition API med `<script setup>`), Vue Router 5, Pinia 3 (State Management), Sass/SCSS.
* Backend & Database: Firebase SDK 12 (Authentication, Firestore, Cloud Storage).
* Test & Kvalitet: Cypress 15 (E2E), Vitest 4 (Unit), ESLint 10 (Flat Config).

---

## 2. Opsætningsvejledning

Følg disse skridt for at downloade, konfigurere og køre projektet lokalt på din maskine.

### Forudsætninger
Sørg for at have [Node.js](https://nodejs.org/) installeret på din computer.

### Trin 1: Installer afhængigheder
Klon repositoriet, åbn din terminal i projektets rodmappe og kør:

```sh
npm install
```

### Trin 2: Konfigurer miljøvariabler (.env)

Opret en fil i projektets rodmappe med navnet `.env`, og indsæt dine Firebase-konfigurationer:

```env
VITE_FIREBASE_API_KEY="DIN_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="dit-projekt.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="dit-projekt"
VITE_FIREBASE_STORAGE_BUCKET="dit-projekt.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcdef"
```

### Trin 3: Start den lokale udviklingsserver

```sh
npm run dev
```

Applikationen vil nu køre lokalt på: `http://localhost:5173`

---

## 3. Brugseksempler (Test & Verificering)

Her er beskrevet, hvordan du afprøver og verificerer systemets funktionaliteter manuelt og automatiseret.

### Manuel test via Demo-konti

Gå til `http://localhost:5173/login` og test de to forskellige brugerroller:

#### Byggeleder (Manager) logind:
* Email: ``
* Adgangskode: ``

**Workflow:**
Se projektoversigt, navigér til et specifikt projekt, opdater status, og tilgå indstillinger (`SettingsView`) for at logge sikkert ud.

#### Privatkunde (Customer) logind:
* Email:``
* Adgangskode: ``

Workflow:
Se den visuelle tidslinje for eget byggeri, tjek billedgalleriet og læs beskeder fra byggelederen.

### Automatiserede E2E-tests (Cypress)

Vi har opbygget robuste End-to-End tests opdelt på roller i hver sin fil for at efterligne reelle brugerhandlinger uden sessions-konflikter:

```sh
npm run test:e2e:dev
```

### Testfiler:
* **`manager.cy.js`**
  * Verificerer succesfuldt login
  * Tester adgang til `/manager`
  * Tester navigation til indstillinger
  * Verificerer sikkert logout

* **`customer.cy.js`**
  * Tester kundens login-flow
  * Verificerer adgang til kunde-dashboard
  * Sikrer at Route Guards blokerer adgang til `/manager`

### Automatiserede Unit-tests (Vitest)

For at teste isoleret forretningslogik og vores Pinia stores (`auth.js` og `project.js`), kør:

```sh
npm run test:unit
```

---

## 4. Bidragende Retningslinjer (Linting & Kodekvalitet)

For at sikre et gnidningsfrit samarbejde i udviklingsteamet skal alle bidrag overholde projektets definerede standarder for kodekvalitet.

### Statisk Kodeanalyse med ESLint

Vi anvender ESLint til at fange fejl i opløbet og håndhæve en ensartet kodestil. Før du foretager et commit eller push, skal du køre linteren for at sikre, at koden er fejlfri:

```sh
npm run lint
```

### Vores Standarder (`eslint.config.js`)

Når du skriver kode i projektet, tjekker linteren strengt for følgende regler:

1. Semikoloner (`semi`)
   * Der skal konsekvent anvendes semikoloner ved afslutning af linjer.
   * Eksempel:
   ```js
   const name = ref('');
   ```

2. Ingen ubenyttet kode (`no-unused-vars`)
   * Variabler, der oprettes, skal bruges.
   * Ubrugt kode afvises for at holde applikationen ren og optimeret.

3. **Type-sikkerhed (`eqeqeq`)**
   * Brug altid striks sammenligning:
   ```js
   ===
   !==
   ```
   * Undgå:
   ```js
   ==
   !=
   ```

### IDE Integration

Det anbefales kraftigt at installere ESLint-udvidelsen i VS Code og aktivere. På den måde retter din editor automatisk semikoloner og basale formateringsfejl, hver eneste gang du gemmer en fil.

---

## Projektstruktur

```plaintext
src/
├── assets/scss/          # SCSS stylesheets (modulær arkitektur)
│   ├── abstracts/        # Globale variabler, farver og mixins
│   └── components/       # Komponent-specifikke styles
├── components/           # Genbrugelige UI- og layoutkomponenter
│   ├── layout/           # Globale layouts (Navbars, Sidebars)
│   └── ui/               # Atomiske UI-komponenter (BaseInput, BaseButton)
├── router/               # Vue Router konfiguration og Route Guards
├── stores/               # Pinia globale tilstande (auth.js, project.js)
├── views/                # Side-komponenter (Sider opdelt efter roller)
│   ├── customer/         # Kundens visninger og dashboards
│   ├── login/            # Logind- og godkendelsessider
│   └── manager/          # Byggelederens administrationssider
├── App.vue               # Applikationens rod-komponent
├── firebase.js           # Initialisering og opsætning af Firebase SDK
└── main.js               # Applikationens entry point
```