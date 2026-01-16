import { supabase } from './supabase'
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
