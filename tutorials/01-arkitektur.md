# Teknisk Arkitektur
Applikationen er bygget som en moderne Single Page Application (SPA) baseret på Vue 3. 

## MVVM Arkitektur
Vi benytter MVVM-mønsteret for at adskille logik og visning:
* **Model:** Firebase Firestore og Firebase Auth håndterer data og autentificering.
* **View:** Vue-komponenter definerer brugergrænsefladen.
* **ViewModel:** Pinia-stores fungerer som bindeled, der transformerer rå data til en visningsvenlig tilstand.

## Komponent-struktur
Projektet er modulært opbygget:
* `/components`: Genanvendelige UI-komponenter (f.eks. `BaseButton.vue`).
* `/stores`: Centraliseret state management med Pinia.
* `/views`: Side-specifikke komponenter, der samler funktionalitet.