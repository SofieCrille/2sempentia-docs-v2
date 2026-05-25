const iconMap = {
  fundament: 'Foundation.png',
  vægge: 'Wall.png',
  tag: 'Roof.png',
  vinduer: 'Window.png',
  dør: 'Door.png',
  interiør: 'Indoor.png',
  nøgle: 'Key.png',
};

export function getPhaseIcon(name) {
  if (!name) return '';
  const n = name.toLowerCase();
  for (const key in iconMap) {
    if (n.includes(key)) return iconMap[key];
  }
  return '';
};

export function getStatusIcon(completed) {
  return completed ? 'Done.png' : 'OnGoing.png';
}