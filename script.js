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
const noteFields = {
  occasion: document.querySelector('#note-occasion'),
  palette: document.querySelector('#note-palette'),
  scope: document.querySelector('#note-scope'),
  date: document.querySelector('#note-date')
};
const questionSets = {
  'Hochzeit': ['Für euer Hochzeitsgespräch', 'Ort und Rahmen der Feier mitbringen.', 'Lieblingsblumen und Beispiele sammeln.', 'Gewünschte Elemente und Budgetrahmen besprechen.'],
  'Geschenk': ['Für eine persönliche Blumengeste', 'Anlass und Lieblingsfarben der beschenkten Person mitdenken.', 'Gewünschten Zeitpunkt und Budgetrahmen besprechen.', 'Geeignete Blumen und Pflege beim Studio klären.'],
  'Saisonale Dekoration': ['Für ein Stück Jahreszeit', 'Standort und verfügbaren Platz mitdenken.', 'Passende Farben und gewünschte Wirkung sammeln.', 'Haltbarkeit, Pflege und Budgetrahmen beim Studio besprechen.']
};
function noteState() {
  return Object.fromEntries(Object.entries(noteFields).map(([key, field]) => [key, field.value]));
}
function readableDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Noch offen';
  const [year, month, day] = value.split('-');
  return `${day}.${month}.${year}`;
}
function refreshNote() {
  const state = noteState();
  const [heading, ...questions] = questionSets[state.occasion];
  const title = document.createElement('h3'); title.textContent = heading;
  const summary = document.createElement('p'); summary.className = 'note-summary';
  summary.textContent = `${state.occasion} · ${state.palette} · ${state.scope}${state.date ? ' · ' + readableDate(state.date) : ''}`;
  const list = document.createElement('ul');
  questions.forEach(question => { const li = document.createElement('li'); li.textContent = question; list.append(li); });
  document.querySelector('#planning-notes').replaceChildren(title, summary, list);
  document.querySelector('#note-output').value = noteText(state);
  document.querySelector('#download-status').textContent = '';
}
Object.values(noteFields).forEach(field => field.addEventListener('change', refreshNote));
function noteText(state) {
  const questions = questionSets[state.occasion].slice(1);
  return [
    'MEINE BLUMENNOTIZ', '',
    `Anlass: ${state.occasion}`, `Farbgefühl: ${state.palette}`,
    `Umfang als Gesprächswunsch: ${state.scope}`, `Datum: ${readableDate(state.date)}`, '',
    'DAS MÖCHTE ICH BESPRECHEN', ...questions.map(item => '- ' + item), '',
    'FLORISTIK-STUDIO DROGT', 'Elter Straße 100a, 48429 Rheine', 'Telefon zur Information: 05971 / 8077475', '',
    'Diese Notiz wurde nur auf deinem Gerät vorbereitet. Sie wurde nicht an das Studio übermittelt.',
    'Keine Anfrage, Bestellung, Buchung, Preis- oder Verfügbarkeitszusage.',
    'Unverbindlicher Websiteentwurf von Leon Oßendorf – keine offizielle Website des Betriebs.',
    'https://drogt.leonossendorf.de/'
  ].join('\r\n');
}
const selectButton = document.querySelector('#select-note');
selectButton.disabled = false;
selectButton.addEventListener('click', () => {
  const output = document.querySelector('#note-output'); output.focus(); output.select();
  document.querySelector('#download-status').textContent = 'Notiz markiert. Kopiert den Text mit Strg+C oder über das Auswahlmenü eures Geräts.';
});
refreshNote();

const photos = [
  { src: 'farbidee-hell.webp', caption: 'Helle Rosen und rosafarbene Blüten im Studio.', source: 'https://www.facebook.com/photo.php?fbid=1264027189065258' },
  { src: 'farbidee-saison.webp', caption: 'Sonnenblumen, Gerbera und Eukalyptus im Studio.', source: 'https://www.facebook.com/photo.php?fbid=1264027279065249' },
  { src: 'arrangement.webp', caption: 'Blumenarrangement in Orange und Apricot aus dem Studio.', source: 'https://www.facebook.com/photo.php?fbid=1457588696375772' }
];
const photoDialog = document.querySelector('#photo-dialog');
let currentPhoto = 0;
let photoOpener;
function displayPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  const photo = photos[currentPhoto];
  const image = document.querySelector('#photo-large'); image.src = photo.src; image.alt = photo.caption;
  document.querySelector('#photo-title').textContent = `Aus dem Studio · ${currentPhoto + 1} / ${photos.length}`;
  document.querySelector('#photo-caption').textContent = photo.caption;
  document.querySelector('#photo-source').href = photo.source;
}
document.querySelectorAll('[data-photo]').forEach(button => {
  button.disabled = false;
  button.addEventListener('click', () => {
    photoOpener = button;
    document.querySelector('#photo-stage').classList.remove('fit');
    document.querySelector('#photo-fit').setAttribute('aria-pressed', 'false');
    document.querySelector('#photo-fit').textContent = 'Gesamte Aufnahme';
    displayPhoto(Number(button.dataset.photo));
    photoDialog.showModal(); document.querySelector('#photo-close').focus();
  });
});
document.querySelector('#photo-close').addEventListener('click', () => photoDialog.close());
document.querySelector('#photo-prev').addEventListener('click', () => displayPhoto(currentPhoto - 1));
document.querySelector('#photo-next').addEventListener('click', () => displayPhoto(currentPhoto + 1));
photoDialog.addEventListener('close', () => photoOpener?.focus());
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); displayPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

document.querySelector('#photo-fit').addEventListener('click', event => {
  const fitted = document.querySelector('#photo-stage').classList.toggle('fit');
  event.currentTarget.setAttribute('aria-pressed', String(fitted));
  event.currentTarget.textContent = fitted ? 'Blütendetail anzeigen' : 'Gesamte Aufnahme';
});
