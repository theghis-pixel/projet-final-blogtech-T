// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  html.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  burger.classList.toggle('active');
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ===== SEARCH =====
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');
const noResults = document.getElementById('noResults');

searchInput.addEventListener('input', filterArticles);

function filterArticles() {
  const query = searchInput.value.toLowerCase().trim();
  const activeFilter = document.querySelector('.filter-btn.active').dataset.cat;
  let count = 0;

  cards.forEach(card => {
    const title = card.querySelector('.card__title').textContent.toLowerCase();
    const desc = card.querySelector('.card__desc').textContent.toLowerCase();
    const cat = card.dataset.cat;

    const matchSearch = query === '' || title.includes(query) || desc.includes(query);
    const matchCat = activeFilter === 'all' || cat === activeFilter;

    if (matchSearch && matchCat) {
      card.style.display = 'block';
      count++;
    } else {
      card.style.display = 'none';
    }
  });

  noResults.style.display = count === 0 ? 'block' : 'none';
}

function clearSearch() {
  searchInput.value = '';
  filterArticles();
}

// ===== CATEGORY FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterArticles();
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

cards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`;
  observer.observe(card);
});