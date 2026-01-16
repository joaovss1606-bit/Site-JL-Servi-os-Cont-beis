import { supabase } from './supabase.js'
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('open');
});

dropdownToggle.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('open');
});
async function testSupabase() {
  const { data, error } = await supabase
    .from('servicos')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Erro Supabase:', error)
  } else {
    console.log('Dados Supabase:', data)
  }
}

testSupabase()
