import { vi, describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../stores/auth';

vi.mock('firebase/auth', () => ({ getAuth: vi.fn(), onAuthStateChanged: vi.fn() }));
vi.mock('@/firebase', () => ({ auth: {} }));

/**
 * Tests for auth store getters
 * Sikrer at isAuthenticated reagerer korrekt på user state
 */
describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('isAuthenticated returnerer false når user er null', () => {
    const auth = useAuthStore();
    auth.user = null;
    expect(auth.isAuthenticated).toBe(false);
  });
});