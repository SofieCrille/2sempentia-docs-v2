# Datamodel & Rettigheder

Data gemmes i Firebase Firestore, og adgangen til den er bygget op om to
brugerroller. Tilsammen sikrer datamodel og security rules, at hver
bruger kun kan se og ændre præcis det, deres rolle tillader.

## Roller

| Rolle      | Adgang                                                                 |
|------------|------------------------------------------------------------------------|
| Manager    | Opretter og administrerer projekter, faser og dokumenter. Kan kommunikere med customer. |
| Customer   | Kan kun se og kommentere på det projekt, de er knyttet til.            |

Rollen tildeles ved oprettelse og gemmes i Firestore under `users`-collectionen.

## Datamodel

Data er organiseret i en række top-level collections med relationer
mellem dem:

### users
Indeholder profildata for alle brugere.

| Felt            | Type     | Beskrivelse                                |
|-----------------|----------|--------------------------------------------|
| name            | string   | Brugerens fulde navn                       |
| email           | string   | Brugerens email                            |
| role            | string   | "manager" eller "customer"                 |
| employeeNumber  | string   | Medarbejdernummer (kun for managers)       |

### projects
Indeholder hvert byggeprojekt og bindeled mellem manager og customer.

| Felt           | Type      | Beskrivelse                                |
|----------------|-----------|--------------------------------------------|
| projectNumber  | string    | Unikt projektnummer brugt ved kobling      |
| name           | string    | Projektets navn                            |
| address        | string    | Adresse på byggeprojektet                  |
| imageUrl       | string    | URL til projektets billede                 |
| status         | string    | "igangværende", "afsluttet" osv.           |
| managerId      | string    | uid på den tilknyttede manager             |
| customerId     | string    | uid på den tilknyttede customer            |
| lastMessageAt  | timestamp | Tidsstempel for seneste besked             |

### projects/{id}/phases
Subcollection under hvert projekt med projektets faser.

| Felt       | Type    | Beskrivelse                                    |
|------------|---------|------------------------------------------------|
| name       | string  | Fasens navn                                    |
| order      | number  | Rækkefølge i projektet                         |
| completed  | boolean | Om fasen er afsluttet                          |

### projects/{id}/messages
Subcollection med beskeder mellem manager og customer på projektet.

| Felt        | Type      | Beskrivelse                                  |
|-------------|-----------|----------------------------------------------|
| text        | string    | Beskedens indhold                            |
| senderId    | string    | uid på afsenderen                            |
| senderName  | string    | Afsenderens navn                             |
| createdAt   | timestamp | Tidspunkt for afsendelse                     |

### employeeWhitelist
Indeholder gyldige medarbejdernumre, som kan bruges til at oprette
en manager-konto. Dokument-id er selve medarbejdernummeret.

## Oprettelse og kobling

### Manager

Manager-konti kan kun oprettes af personer med et gyldigt medarbejdernummer.
Ved oprettelse:

1. Medarbejdernummeret valideres mod `employeeWhitelist`
2. Firebase Auth opretter brugeren
3. Brugerdata gemmes i `users` med rollen "manager"
4. Medarbejdernummeret fjernes fra whitelisten, så det ikke kan genbruges

### Customer

En customer knyttes til et eksisterende projekt via projektnummer:

1. Projektnummeret slås op i `projects`
2. Hvis projektet findes, oprettes Firebase Auth-brugeren
3. Brugerdata gemmes i `users` med rollen "customer"
4. Projektets `customerId` opdateres til den nye brugers uid

Det sikrer, at en customer kun kan oprette sig på et projekt, der allerede
er oprettet af en manager.

## Sikkerhedsregler

Rettighedsstyringen håndhæves på serveren med Firestore Security Rules.
Reglerne følger princippet om least privilege og tjekker både, om brugeren
er logget ind, og om de er knyttet til de relevante data:

\`\`\`javascript
allow read: if request.auth != null
  && (resource.data.managerId == request.auth.uid
      || resource.data.customerId == request.auth.uid);
\`\`\`

På den måde kan en customer aldrig læse projekter, de ikke er knyttet til,
selv hvis frontenden skulle kompromitteres. Skriverettigheder gives kun
til manageren, mens chat tillader skrivning fra begge parter.

## Single source of truth i frontend

Brugerens identitet og rolle håndteres centralt af `auth`-storen.
Tidligere blev rollen udledt flere steder i appen, hvilket gav spredt
logik og risiko for inkonsistens. Storen samler det ét sted og udstiller
getterne `isManager` og `isCustomer`, som komponenter og navigation
guards bruger frem for at duplikere logikken. På den måde matcher
frontend-tjekkene altid de regler, der gælder på serveren.

For den fulde API-dokumentation af auth-storen, se [stores/auth-modulet](../module-stores_auth.html).