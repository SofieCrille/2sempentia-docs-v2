# Git & Branching Strategi

I dette projekt benyttes en **Single-Branch** strategi, hvor alt udviklingsarbejde foregår i `main`-branchen.

### Begrundelse
Valget er truffet for at maksimere hastighed og samarbejde i et mindre team. Da vi har automatiseret vores test- og deploy-proces via GitHub Actions, bliver koden kvalitetssikret ved hvert commit frem for manuelt via merge-branches.

### CI/CD Integration
Hvert push til `main` trigger automatisk:
1. **Linting:** Sikrer ensartet kodeformat.
2. **Unit Tests:** Verificerer forretningslogik.
3. **E2E Tests:** Validerer kritiske flows (login/rettigheder).
4. **Deploy:** Opdaterer automatisk vores live-dokumentation via GitHub Pages.