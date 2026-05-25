import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/date';

/**
 * Tests for formatDate utility.
 * Verificerer korrekt formatering af Firestore-timestamps.
 */
describe('formatDate', () => {
  it('returnerer tom streng for null timestamp', () => {
    // Arrange
    const timestamp = null;

    // Act
    const result = formatDate(timestamp);

    // Assert
    expect(result).toBe('');
  });

  it('returnerer dato uden tid som standard', () => {
    // Arrange
    const timestamp = { seconds: new Date('2026-03-10T14:30:00').getTime() / 1000 };

    // Act
    const result = formatDate(timestamp);

    // Assert
    expect(result).toBe('10.3.2026');
  });

  it('inkluderer klokkeslæt når time er true', () => {
    // Arrange
    const timestamp = { seconds: new Date('2026-03-10T14:30:00').getTime() / 1000 };

    // Act
    const result = formatDate(timestamp, { time: true });

    // Assert
    expect(result).toBe('10.3.2026 14:30');
  });

  it('returnerer "I dag" når relative er true og datoen er i dag', () => {
    // Arrange
    const timestamp = { seconds: Date.now() / 1000 };

    // Act
    const result = formatDate(timestamp, { relative: true });

    // Assert
    expect(result).toBe('I dag');
  });
});