const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus();
  }
});
const notes = {
  'Hochzeit': ['Für euer Hochzeitsgespräch', 'Wann und wo feiert ihr?', 'Welche Farben und Blumen mögt ihr?', 'Welche floralen Elemente wünscht ihr euch?', 'Welchen Budgetrahmen möchtet ihr besprechen?'],
  'Geschenk': ['Für eine persönliche Blumengeste', 'Für wen und zu welchem Anlass?', 'Welche Farben mag die Person?', 'Wann möchtet ihr die Blumen verschenken?', 'Welchen Budgetrahmen habt ihr im Kopf?'],
  'Saisonale Dekoration': ['Für ein Stück Jahreszeit', 'Wo soll die Dekoration stehen?', 'Welche Farben passen in den Raum?', 'Wie viel Platz ist vorhanden?', 'Welche Pflege und Haltbarkeit wünscht ihr euch?']
};
document.querySelectorAll('[data-occasion]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-occasion]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const [heading, ...questions] = notes[button.dataset.occasion];
  const title = document.createElement('h3'); title.textContent = heading;
  const list = document.createElement('ul');
  questions.forEach(question => { const li = document.createElement('li'); li.textContent = question; list.append(li); });
  document.querySelector('#planning-notes').replaceChildren(title, list);
}));
