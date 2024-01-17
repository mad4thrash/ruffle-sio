const toggleBtn = document.querySelector('.toggle');
const header = document.getElementById('header');
const resetBtn = document.getElementById('reset-app');

toggleBtn.addEventListener('click', () => {
  header.classList.toggle('trans');
  toggleBtn.classList.toggle('toggle-rotation');
});

resetBtn.addEventListener('click', () => {
  localStorage.clear();
  alert('La Configurazione è stata cancellata')
});

