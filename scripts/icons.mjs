export const icons = {
  backward: '<path fill="currentColor" stroke="none" d="m14 18-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6z"/>',
  forward: '<path fill="currentColor" stroke="none" d="M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6z"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  home: '<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z"/>',
  monitor: '<rect x="3" y="3" width="18" height="13" rx="1"/><path d="M12 16v5m-5 0h10"/>',
  cube: '<path d="m12 2 9 5v10l-9 5-9-5V7Zm0 10L3 7m9 5 9-5m-9 5v10M7.5 4.5l9 5"/>',
  shield: '<path d="M12 2c3 3 6 3 8 4v6c0 5-5 8-8 10-3-2-8-5-8-10V6c2-1 5-1 8-4Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
  document: '<path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8m-8 4h8"/>',
  server:
    '<rect x="3" y="3" width="18" height="7" rx="1"/><rect x="3" y="14" width="18" height="7" rx="1"/><path d="M7 6.5h.01M7 17.5h.01M12 6.5h5m-5 11h5"/>',
  play: '<path d="m7 3 15 9-15 9Z"/>',
  database:
    '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  storage: '<path d="m5 3-3 14v4h20v-4L19 3ZM2 17h6l2 2h4l2-2h6M9 7h6m-7 4h8"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  moon: '<path d="M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  github:
    '<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.6-2.5 3.4-.4 6.6-1.6 6.6-7.5 0-1.6-.6-3-1.6-4 .2-.4.7-2-.2-4 0 0-1.3-.4-4.2 1.6a15 15 0 0 0-8 0C4.1-.4 2.8 0 2.8 0c-.9 2-.4 3.6-.2 4C1.6 5 1 6.4 1 8c0 5.9 3.2 7.1 6.6 7.5C7 16 7 17 7 18v4" transform="translate(1 1) scale(.9)"/>',
};
export function icon(name) {
  if (!icons[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}
