# Test & Kvalitetssikring

Vi sikrer applikationens stabilitet gennem et lagdelt test-setup:

* **Unit Tests:** Vi tester forretningslogik i vores Pinia-stores og utility-funktioner (f.eks. dato-formatering) ved hjælp af Vitest.
* **E2E Tests:** Cypress simulerer brugerflows, herunder:
    1. **Autentificering:** Flowet fra login til dashboard.
    2. **Rettighedskontrol:** Verifikation af, at kunder ikke har adgang til manager-ruter.