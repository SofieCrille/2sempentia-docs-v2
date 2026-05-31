// src/test/auth.test.js
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../stores/auth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  query: vi.fn(),
  collection: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
}));

vi.mock('@/firebase', () => ({
  auth: {},
  db: {},
}));

/**
 * Tests for auth-storens centrale logik.
 * Dækker getters, state-håndtering og fejlhåndtering i createCustomer/createManager.
 */
describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    it('isAuthenticated returnerer false når user er null', () => {
      const auth = useAuthStore();
      auth.user = null;
      expect(auth.isAuthenticated).toBe(false);
    });

    it('isAuthenticated returnerer true når user er sat', () => {
      const auth = useAuthStore();
      auth.user = { uid: 'abc123' };
      expect(auth.isAuthenticated).toBe(true);
    });

    it('isManager returnerer true når role er manager', () => {
      const auth = useAuthStore();
      auth.role = 'manager';
      expect(auth.isManager).toBe(true);
      expect(auth.isCustomer).toBe(false);
    });

    it('isCustomer returnerer true når role er customer', () => {
      const auth = useAuthStore();
      auth.role = 'customer';
      expect(auth.isCustomer).toBe(true);
      expect(auth.isManager).toBe(false);
    });
  });

  describe('logout', () => {
    it('rydder user, role og name når der logges ud', async () => {
      const { signOut } = await import('firebase/auth');
      signOut.mockResolvedValue();

      const auth = useAuthStore();
      auth.user = { uid: 'abc123' };
      auth.role = 'manager';
      auth.name = 'Test Bruger';

      await auth.logout();

      expect(auth.user).toBe(null);
      expect(auth.role).toBe(null);
      expect(auth.name).toBe(null);
    });
  });

  describe('createCustomer', () => {
    it('kaster fejl hvis projektnummeret ikke findes', async () => {
      const { getDocs } = await import('firebase/firestore');
      getDocs.mockResolvedValue({ empty: true });

      const auth = useAuthStore();

      await expect(
        auth.createCustomer({
          name: 'Anna',
          email: 'anna@test.dk',
          password: 'pw',
          projectNumber: 'ikke-eksisterende',
        })
      ).rejects.toThrow('Projektnummer findes ikke');
    });
  });

  describe('createManager', () => {
    it('kaster fejl hvis medarbejdernummeret ikke findes i whitelist', async () => {
      const { getDoc } = await import('firebase/firestore');
      getDoc.mockResolvedValue({ exists: () => false });

      const auth = useAuthStore();

      await expect(
        auth.createManager({
          name: 'Lars',
          email: 'lars@test.dk',
          password: 'pw',
          employeeNumber: 'ikke-eksisterende',
        })
      ).rejects.toThrow('Medarbejdernummer findes ikke');
    });
  });
});