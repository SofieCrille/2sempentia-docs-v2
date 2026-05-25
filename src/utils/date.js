/**
 * Formaterer en Firestore-timestamp til en læsbar streng.
 * @param {Object} timestamp - Firestore timestamp med .seconds
 * @param {Object} options
 * @param {boolean} options.time - Inkludér klokkeslæt (default false)
 * @param {boolean} options.relative - Brug "I dag"/"I går" (default false)
 * @returns {string}
 */
export function formatDate(timestamp, { time = false, relative = false } = {}) {
  if (!timestamp?.seconds) return '';

  const d = new Date(timestamp.seconds * 1000);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const clock = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  const date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

  if (relative) {
    if (d.toDateString() === now.toDateString()) return time ? clock : 'I dag';
    if (d.toDateString() === yesterday.toDateString()) return time ? `I går ${clock}` : 'I går';
  }

  return time ? `${date} ${clock}` : date;
}