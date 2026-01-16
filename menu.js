import { supabase } from './supabase.js'

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.menu-item.dropdown');

/* MENU MOBILE */
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

/* DROPDOWN MOBILE */
dropdownToggle.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    dropdown.classList.toggle('open');
  }
});

/* SUPABASE OK — NÃO INTERFERE NO MENU */
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
