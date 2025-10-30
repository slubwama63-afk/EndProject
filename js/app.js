// Hämtar viktiga element
const form = document.querySelector('#searchForm');
const input = document.querySelector('#q');
const categorySelect = document.querySelector('#category'); // 🔹 nytt element
const resultsEl = document.querySelector('#results');
const paginationEl = document.querySelector('#pagination');

const bookModal = document.querySelector('#bookModal');
const closeModal = document.querySelector('#closeModal');
const modalTitle = document.querySelector('#modalTitle');
const modalAuthor = document.querySelector('#modalAuthor');
const modalYear = document.querySelector('#modalYear');
const modalSubjects = document.querySelector('#modalSubjects');

let limit = 10;
let offset = 0;
let lastQuery = '';

console.log('app.js laddad');

// 🔹 Modal-stängning
closeModal.addEventListener('click', () => {
  bookModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === bookModal) {
    bookModal.style.display = 'none';
  }
});

// Skapar omslags-URL utifrån bokdata
function coverUrlFromDoc(doc) {
  if (doc.cover_edition_key) {
    return `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`;
  }
  if (doc.isbn && doc.isbn.length) {
    return `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
  }
  return 'https://via.placeholder.com/200x260?text=No+Cover';
}

// Hämtar böcker via API
async function fetchBooks(q, limit = 10, offset = 0) {
  console.log('fetchBooks körs med sökord:', q);
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  console.log('API-data mottagen, antal docs:', data.docs.length);
  return data;
}

// Visar böcker i grid
function renderBooks(docs, numFound) {
  console.log('renderBooks körs, antal böcker:', docs.length);
  resultsEl.innerHTML = '';
  if (!docs || docs.length === 0) {
    resultsEl.innerHTML = `<p>Inga resultat.</p>`;
    paginationEl.innerHTML = '';
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'grid';

  docs.forEach(doc => {
    console.log('Skapar kort för:', doc.title);
    const card = document.createElement('article');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = coverUrlFromDoc(doc);
    img.alt = doc.title || 'Book cover';

    const title = document.createElement('h3');
    title.textContent = doc.title;

    const author = document.createElement('p');
    author.textContent = (doc.author_name || ['Okänd']).join(', ');

    card.append(img, title, author);
    grid.appendChild(card);

    // 🔹 Click-event för modal
    card.addEventListener('click', () => {
      console.log('Bokkort klickat:', doc.title);
      modalTitle.textContent = doc.title || 'Okänd titel';
      modalAuthor.textContent = (doc.author_name || ['Okänd']).join(', ');
      modalYear.textContent = doc.first_publish_year || 'Okänt';
      modalSubjects.textContent = (doc.subject || ['Okända kategorier']).join(', ');
      bookModal.style.display = 'flex';
    });
  });

  resultsEl.appendChild(grid);

  // Enkel pagination
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(numFound / limit);

  paginationEl.innerHTML = `
    <button id="prev" ${offset === 0 ? 'disabled' : ''}>Prev</button>
    <span>Sida ${currentPage} av ${totalPages}</span>
    <button id="next" ${offset + limit >= numFound ? 'disabled' : ''}>Next</button>
  `;

  document.querySelector('#prev').addEventListener('click', () => {
    offset = Math.max(0, offset - limit);
    doSearch(lastQuery);
  });

  document.querySelector('#next').addEventListener('click', () => {
    offset += limit;
    doSearch(lastQuery);
  });
}

// Utför sökning
async function doSearch(q) {
  try {
    console.log('doSearch körs med:', q);
    resultsEl.innerHTML = '<p>Laddar...</p>';
    const data = await fetchBooks(q, limit, offset);
    lastQuery = q;

    // 🔹 Filtrera resultat baserat på vald kategori
    const selectedCategory = categorySelect.value;
    let filteredDocs = data.docs;
    if (selectedCategory) {
      filteredDocs = data.docs.filter(doc =>
        doc.subject && doc.subject.includes(selectedCategory)
      );
      console.log(`Filtrerar på kategori: ${selectedCategory}, antal efter filtrering: ${filteredDocs.length}`);
    }

    renderBooks(filteredDocs, data.numFound);
  } catch (err) {
    resultsEl.innerHTML = `<p>Fel: ${err.message}</p>`;
    console.error('Fel i doSearch:', err);
  }
}

// Startar sökning vid submit
form.addEventListener('submit', e => {
  e.preventDefault();
  offset = 0;
  const q = input.value.trim();
  if (q) {
    console.log('Form submit med sökord:', q);
    doSearch(q);
  }
});




