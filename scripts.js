import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

if (!books || !Array.isArray(books)) {
  throw new Error('Books data is missing or not in the correct format.');
}

const homePageBookPreviews = document.createDocumentFragment();

const createBookElements = (book) => {
  const { author, id, image, title, description, published, genres } = book;
  const authorName = authors[author];

  const bookElement = document.createElement('dl');
  bookElement.className = 'preview';
  bookElement.dataset.id = id;
  bookElement.dataset.image = image;
  bookElement.dataset.title = title;
  bookElement.dataset.subtitle = `${authorName} (${new Date(published).getFullYear()})`;
  bookElement.dataset.genre = genres.join(', ');
  bookElement.dataset.description = description; // Ensure description is included

  bookElement.innerHTML = /*html*/ `
    <div>
      <img class='preview__image' src='${image}' alt='Picture of the book'/>
    </div>
    <div class='preview__info'>
      <dt class='preview__title'>${title}</dt>
      <dt class='preview__author'>By ${authorName}</dt>
    </div>
  `;

  return bookElement;
};


const extractedBooks = books.slice(0, 36);

for (const bookObj of extractedBooks) {
  const newBook = createBookElements(bookObj);
  homePageBookPreviews.appendChild(newBook);
}

const fullBookList = document.querySelector('[data-list-items]');
fullBookList.appendChild(homePageBookPreviews);

const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};

const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
};

const themeElementReference = {
  headerIcon: document.querySelector('[data-header-settings]'),
  overlay: document.querySelector('[data-settings-overlay]'),
  theme: document.querySelector('[data-settings-theme]'),
  saveButton: document.querySelector("button.overlay__button.overlay__button_primary[form='settings']"),
  cancelButton: document.querySelector('[data-settings-cancel]')
};

const themeSettings = () => {
  const settingsOverlay = themeElementReference.overlay;
  
  if (settingsOverlay.open) {
    settingsOverlay.open = false;
    // Ensure overlay is hidden
    settingsOverlay.style.display = "none";
  } else {
    settingsOverlay.open = true;
    // Ensure overlay is visible
    settingsOverlay.style.display = "block";
  }
};

const chooseTheme = (event) => {
  event.preventDefault();
  const themeValue = themeElementReference.theme.value;

  if (themeValue === 'day') {
    document.documentElement.style.setProperty("--color-dark", day.dark);
    document.documentElement.style.setProperty("--color-light", day.light);
  } else if (themeValue === 'night') {
    document.documentElement.style.setProperty("--color-dark", night.dark);
    document.documentElement.style.setProperty("--color-light", night.light);
  }

  themeSettings();
};

themeElementReference.headerIcon.addEventListener('click', themeSettings);
themeElementReference.cancelButton.addEventListener('click', themeSettings);
themeElementReference.saveButton.addEventListener('click', chooseTheme);

const showMoreButton = document.querySelector("[data-list-button]");
let beginPreview = 0;
let endPreview = 36;
const numberOfBooks = Math.min(books.length - endPreview,);
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numberOfBooks})</span>`
showMoreButton.innerHTML = showMoreButtonText

showMoreButton.addEventListener("click", () => {
  beginPreview += 36;
  endPreview += 36;
  const startIndex = beginPreview;
  const endIndex = endPreview;

  const pull = books.slice(startIndex, endIndex);

  const createPreviewsFragment = document.createDocumentFragment();

  for (const { author, image, title, id, description, published } of pull) {
    const preview = document.createElement("dl");
    preview.className = "preview";
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${new Date(published).getFullYear()})`;
    preview.dataset.description = description;

    preview.innerHTML = `
      <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
      </div>`;

    createPreviewsFragment.appendChild(preview);
  }

  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(createPreviewsFragment);

  const numberOfBooks = Math.min(books.length - endIndex);
  const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numberOfBooks})`;
  showMoreButton.innerHTML = showMoreButtonText;
});

const settingsButton = document.querySelector("[data-header-settings]");
settingsButton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
});

const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
});
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

const cancelButton = document.querySelector("[data-settings-cancel]");
cancelButton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
});

const toggleDetails = (event) => {
  const overlay1 = document.querySelector("[data-list-active]");
  const title = document.querySelector("[data-list-title]");
  const subtitle = document.querySelector("[data-list-subtitle]");
  const description = document.querySelector("[data-list-description]");
  const image1 = document.querySelector("[data-list-image]");
  const imageblur = document.querySelector("[data-list-blur]");

  if (event.target.dataset.id) {
    overlay1.style.display = "block";
    description.innerHTML = event.target.dataset.description;
    subtitle.innerHTML = event.target.dataset.subtitle;
    title.innerHTML = event.target.dataset.title;
    image1.setAttribute("src", event.target.dataset.image);
    imageblur.setAttribute("src", event.target.dataset.image);
  }
};

const closeDetails = document.querySelector("[data-list-close]");
closeDetails.addEventListener("click", (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
});

const click = document.querySelector('[data-list-items]');
click.addEventListener('click', toggleDetails);

const cancelButtn = document.querySelector('[data-settings-cancel]')
cancelButtn.addEventListener("click", () => {
});

const allauthorsOption = document.createElement('option')
allauthorsOption.value = "any";
allauthorsOption.textContent = "All authors";
const authorSelect = document.querySelector("[data-search-authors]");
authorSelect.appendChild(allauthorsOption);
for (const authorId in authors) {
  const optionElement = document.createElement("option");
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}

const genreSelect = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement('option');
allGenresOption.value = "any";
allGenresOption.textContent = "All genres";
genreSelect.appendChild(allGenresOption);
for (const genreId in genres) {
  const optionElement = document.createElement("option");
  optionElement.value = genreId;
  optionElement.textContent = genres[genreId];
  genreSelect.appendChild(optionElement);
}

const searchButton2 = document.querySelector("[data-search-button]"); // Corrected selector
searchButton2.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("[data-search-title]").value;
  const author = document.querySelector("[data-search-authors]").value;
  const genre = document.querySelector("[data-search-genres]").value;

  const filteredBooks = books.filter((book) => {
    const titleMatch = !title || book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === "any" || book.author === author;
    const genreMatch = genre === "any" || book.genres.includes(genre);
    return titleMatch && authorMatch && genreMatch;
  });

  const searchResultFragment = document.createDocumentFragment();

  for (const book of filteredBooks) {
    const searchResultItem = document.createElement("dl");
    searchResultItem.className = "preview";
    searchResultItem.dataset.id = book.id;
    searchResultItem.dataset.title = book.title;
    searchResultItem.dataset.subtitle = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
    searchResultItem.dataset.image = book.image;
    searchResultItem.dataset.description = book.description;

    searchResultItem.innerHTML = `
      <div>
        <img class='preview__image' src="${book.image}" alt="book pic"/>
      </div>
      <div class='preview__info'>
        <dt class='preview__title'>${book.title}</dt>
        <dt class='preview__author'> By ${authors[book.author]}</dt>
      </div>`;

    searchResultFragment.appendChild(searchResultItem);
  }

  const bookList = document.querySelector("[data-list-items]");
  bookList.innerHTML = "";
  bookList.appendChild(searchResultFragment);
});
  const bookList = document.querySelector("[data-list-items]");
  bookList.innerHTML = "";
  bookList.appendChild(searchResultFragment);
;

const searchButton = document.querySelector("[data-search-search]");
searchButton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

const searchButton1 = document.querySelector("[data-search-search]");
searchButton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

const cancelbutton = document.querySelector("[data-search-cancel]");
cancelbutton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});





