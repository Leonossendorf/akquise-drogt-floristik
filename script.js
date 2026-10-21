document.body.classList.add('js');
const menu=document.querySelector('.menu');
const navigation=document.querySelector('#navigation');
menu.hidden=false;
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menu.focus();}});
const form=document.querySelector('#contact-form');
const status=document.querySelector('#form-status');
form.addEventListener('submit',event=>{
  event.preventDefault();
  status.hidden=false;
  status.textContent='Dies ist eine Formular-Vorschau. Eure Eingaben wurden nicht versendet und nicht gespeichert. Für einen echten Kontakt nutzt bitte die Angaben des Studios neben dem Formular.';
});
form.addEventListener('input',()=>{status.hidden=true;});
form.querySelector('fieldset').disabled=false;
function resetPreview(){form.reset();status.hidden=true;}
window.addEventListener('pageshow',resetPreview);
document.querySelectorAll('[data-occasion]').forEach(link=>link.addEventListener('click',()=>{
  document.querySelector('#contact-occasion').value=link.dataset.occasion;
  status.hidden=true;
}));
