import { supabase } from './supabase.js';

/* MENU MOBILE */
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

/* DROPDOWN MOBILE */
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownItem = document.querySelector('.menu-item.dropdown');

dropdownToggle.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault(); // impede navegação no mobile
    dropdownItem.classList.toggle('open');
  }
});

/* TESTE SUPABASE (não interfere no menu) */
async function testSupabase() {
  const { data, error } = await supabase
    .from('servicos')
    .select('*');

  if (error) {
    console.error('Erro Supabase:', error);
  } else {
    console.log('Dados Supabase:', data);
  }
}

testSupabase();
