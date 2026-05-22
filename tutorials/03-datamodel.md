# Datamodel & Rettigheder

Data gemmes i Firebase Firestore. Vi opererer med to hovedroller:

| Rolle | Rettigheder |
| :--- | :--- |
| **Manager** | Kan oprette projekter, styre brugere og se alle chat-tråde. |
| **Customer** | Kan kun se egne projekter og kommunikere i tilknyttede chats. |

### Sikkerhedsregler
Rettighedsstyring håndteres direkte i Firestore Security Rules, således at brugere kun kan læse/skrive data, der er knyttet til deres `uid`.