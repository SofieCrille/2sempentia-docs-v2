// src/stores/auth.js
import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, query, collection, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

/**
 * @typedef {Object} UserData
 * @property {string} name - Brugerens fulde navn
 * @property {('manager'|'customer')} role - Brugerens rolle i systemet
 * @property {string} [employeeNumber] - Medarbejdernummer, kun for managers
 */

/**
 * Auth Store
 *
 * Håndterer al autentificering og rollestyring i applikationen.
 * Fungerer som single source of truth for den indloggede brugers
 * identitet og rolle (manager eller customer) og bruges af komponenter,
 * navigation guard og andre stores til at træffe rolle-baserede valg.
 *
 * Synkroniserer automatisk med Firebase Auth, så brugerens state opdateres,
 * når de logger ind eller ud, også på tværs af faner.
 *
 * @module stores/auth
 */
export const useAuthStore = defineStore('auth', () => {

  // ===== States =====

  /**
   * Firebase Auth-bruger eller null hvis ikke logget ind.
   * @type {import('vue').Ref<import('firebase/auth').User|null>}
   */
  const user = ref(null);

  /**
   * Brugerens rolle, hentet fra Firestore.
   * @type {import('vue').Ref<('manager'|'customer'|null)>}
   */
  const role = ref(null);

  /**
   * Brugerens fulde navn, hentet fra Firestore.
   * @type {import('vue').Ref<string|null>}
   */
  const name = ref(null); 

  /**
   * True når Firebase har afgjort, om brugeren er logget ind eller ej.
   * Bruges af router-guard til at vente med navigation, indtil auth-state er klar.
   * @type {import('vue').Ref<boolean>}
   */
  const ready = ref(false);

  // ===== Getters =====

  /**
   * True hvis en bruger er logget ind.
   * Bruges af router-guard og UI til at vise log-ind/log-ud state.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const isAuthenticated = computed(() => !!user.value);

  /**
   * True hvis den indloggede bruger er en manager.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const isManager = computed(() => role.value === 'manager');

  /**
   * True hvis den indloggede bruger er en customer.
   * @type {import('vue').ComputedRef<boolean>}
   */
  const isCustomer = computed(() => role.value === 'customer');

  // ===== Actions =====

  /**
   * Logger en bruger ind med email og password, og henter deres
   * profildata fra Firestore. Opdaterer storens state med bruger,
   * rolle og navn.
   *
   * @async
   * @param {string} email - Brugerens email
   * @param {string} password - Brugerens password
   * @returns {Promise<('manager'|'customer'|undefined)>} Brugerens rolle, eller undefined hvis profilen ikke findes
   *
   * @example
   * const auth = useAuthStore();
   * const role = await auth.login('user@example.com', 'password123');
   * if (role === 'manager') router.push('/manager');
   */
  async function login(email, password) {
    const { user: u } = await signInWithEmailAndPassword(auth, email, password);
    user.value = u;

    const snap = await getDoc(doc(db, 'users', u.uid));
    const data = snap.data();
    role.value = data?.role;
    name.value = data?.name;

    return data?.role;
  };

  /**
   * Logger den nuværende bruger ud og rydder storens state.
   *
   * @async
   * @returns {Promise<void>}
   *
   * @example
   * const auth = useAuthStore();
   * await auth.logout();
   * router.push('/login');
   */
  async function logout() {
    await signOut(auth);
    user.value = null;
    role.value = null;
    name.value = null;
  };

  /**
   * Opretter en ny customer-konto og knytter den til et eksisterende projekt
   * via projektnummeret. Customer-rollen sættes automatisk, og projektets
   * customerId opdateres til den nye brugers uid.
   *
   * @async
   * @param {Object} payload - Customer-data
   * @param {string} payload.name - Customerens fulde navn
   * @param {string} payload.email - Email til den nye konto
   * @param {string} payload.password - Password til den nye konto
   * @param {string} payload.projectNumber - Projektnummer der knytter customer til eksisterende projekt
   * @returns {Promise<'customer'>} Den tildelte rolle
   * @throws {Error} Hvis projektnummeret ikke findes i projects-collectionen
   *
   * @example
   * await auth.createCustomer({
   *   name: 'Anna Hansen',
   *   email: 'anna@example.com',
   *   password: 'sikker123',
   *   projectNumber: '2024-042'
   * });
   */
  async function createCustomer({ name, email, password, projectNumber }) {
    const q = query(
      collection(db, 'projects'),
      where('projectNumber', '==', projectNumber)
    );
    const snap = await getDocs(q);

    if (snap.empty) throw new Error('Projektnummer findes ikke');

    const projectDoc = snap.docs[0];
    const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
    user.value = u;

    await setDoc(doc(db, 'users', u.uid), {
      name,
      email,
      role: 'customer',
    });

    await updateDoc(projectDoc.ref, {
      customerId: u.uid
    });

    role.value = 'customer';
    return 'customer';
  };

  /**
   * Opretter en ny manager-konto efter validering mod whitelisten af
   * medarbejdernumre. Hvis nummeret findes, oprettes kontoen, og nummeret
   * fjernes fra whitelisten, så det ikke kan genbruges.
   *
   * @async
   * @param {Object} payload - Manager-data
   * @param {string} payload.name - Managerens fulde navn
   * @param {string} payload.email - Email til den nye konto
   * @param {string} payload.password - Password til den nye konto
   * @param {string} payload.employeeNumber - Medarbejdernummer der skal valideres mod whitelist
   * @returns {Promise<'manager'>} Den tildelte rolle
   * @throws {Error} Hvis medarbejdernummeret ikke findes i whitelisten
   *
   * @example
   * await auth.createManager({
   *   name: 'Lars Jensen',
   *   email: 'lars@test.dk',
   *   password: 'lars123',
   *   employeeNumber: '62568542'
   * });
   */
  async function createManager({ name, email, password, employeeNumber }) {
    const whitelistRef = doc(db, 'employeeWhitelist', employeeNumber);
    const whitelistSnap = await getDoc(whitelistRef); // Tjekker om medarbejdernummeret findes i whitelist collection
    
    if (!whitelistSnap.exists()) throw new Error('Medarbejdernummer findes ikke');

    const { user: u } = await createUserWithEmailAndPassword(auth, email, password);
    user.value = u;

    await setDoc(doc(db, 'users', u.uid), {
      name,
      email,
      employeeNumber,
      role: 'manager',
    });

    await deleteDoc(whitelistRef);

    role.value = 'manager';
    return 'manager';
  };

  /**
   * Opdaterer den indloggede brugers data i Firestore. Hvis navnet
   * opdateres, synkroniseres det også til storens state, så ændringen
   * afspejles i UI'et med det samme.
   *
   * @async
   * @param {Partial<UserData>} data - Felter der skal opdateres
   * @returns {Promise<void>}
   *
   * @example
   * await auth.updateUser({ name: 'Anna Nielsen' });
   */
  async function updateUser(data) {
    if (!user.value) return;
    await updateDoc(doc(db, 'users', user.value.uid), data);
    if (data.name !== undefined) name.value = data.name;
  };

  /**
   * Lytter på Firebase Auth-state og synkroniserer storens user, role og name
   * med Firestore. Sætter ready til true, når initialiseringen er færdig.
   * Kører automatisk ved app-start og ved hver login/logout.
   */
  onAuthStateChanged(auth, async (u) => {
    user.value = u;

    if (u) {
      const snap = await getDoc(doc(db, 'users', u.uid));
      const data = snap.data();
      role.value = data?.role;
      name.value = data?.name;
    };

    ready.value = true;
  });

  return {
    user,
    role,
    name,
    ready,
    isAuthenticated,
    isManager,
    isCustomer,
    login,
    logout,
    createCustomer,
    createManager,
    updateUser
  };
});