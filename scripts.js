// Importing data from an external file
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";


// Check if the 'books' data is available and in the correct format
if (!books || !Array.isArray(books)) {
  throw new Error('Books data is missing or not in the correct format.');
}


// Create a document fragment to store home page book previews
const homePageBookPreviews = document.createDocumentFragment();


/**
 * Create HTML elements for a book
 *
 * @param {Object} book - The book object
 * @returns {HTMLElement} - The HTML element representing the book
 */
const createBookElements = (book) => {
      // Destructuring book properties
  const { author, id, image, title, description, published, genres } = book;
  const authorName = authors[author];

  // Create a 'dl' element for the book preview
  const bookElement = document.createElement('dl');
  bookElement.className = 'preview';
  bookElement.dataset.id = id;
  bookElement.dataset.image = image;
  bookElement.dataset.title = title;
  bookElement.dataset.subtitle = `${authorName} (${new Date(published).getFullYear()})`;
  bookElement.dataset.genre = genres.join(', ');
  bookElement.dataset.description = description; // Ensure description is included

  
  // Set inner HTML for the book preview
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

// Extract the first 36 books for the home page
const extractedBooks = books.slice(0, 36);

// Append home page book previews to the document fragment
for (const bookObj of extractedBooks) {
  const newBook = createBookElements(bookObj);
  homePageBookPreviews.appendChild(newBook);
}


// Append the home page book previews to the full book list in the DOM
const fullBookList = document.querySelector('[data-list-items]');
fullBookList.appendChild(homePageBookPreviews);

// Define color schemes for day and night themes
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};

const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
};

// References to theme-related elements in the DOM
const themeElementReference = {
  headerIcon: document.querySelector('[data-header-settings]'),
  overlay: document.querySelector('[data-settings-overlay]'),
  theme: document.querySelector('[data-settings-theme]'),
  saveButton: document.querySelector("button.overlay__button.overlay__button_primary[form='settings']"),
  cancelButton: document.querySelector('[data-settings-cancel]')
};

/**
 * Toggle the display of the theme settings overlay
 */
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

/**
 * Apply the selected theme and close the theme settings overlay
 *
 * @param {Event} event - The click event
 */
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

// Event listeners for theme-related actions
themeElementReference.headerIcon.addEventListener('click', themeSettings);
themeElementReference.cancelButton.addEventListener('click', themeSettings);
themeElementReference.saveButton.addEventListener('click', chooseTheme);

// Show more button functionality
const showMoreButton = document.querySelector("[data-list-button]");
let beginPreview = 0;
let endPreview = 36;
const numberOfBooks = Math.min(books.length - endPreview,);
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numberOfBooks})</span>`
showMoreButton.innerHTML = showMoreButtonText

/**
 * Event listener for the "Show More" button
 */
showMoreButton.addEventListener("click", () => {
  beginPreview += 36;
  endPreview += 36;
  const startIndex = beginPreview;
  const endIndex = endPreview;

   // Slice the next set of books to display
  const pull = books.slice(startIndex, endIndex);

  const createPreviewsFragment = document.createDocumentFragment();

  
  // Append the new previews to the fragment
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

  
  // Append the new previews to the full book list in the DOM
  const booklist1 = document.querySelector("[data-list-items]");
  booklist1.appendChild(createPreviewsFragment);

  
  // Update the number of remaining books for the show more button
  const numberOfBooks = Math.min(books.length - endIndex);
  const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numberOfBooks})`;
  showMoreButton.innerHTML = showMoreButtonText;
});

// Event listener for settings button
const settingsButton = document.querySelector("[data-header-settings]");
settingsButton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
});

// Event listener for search button
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
});

// Event listener for search cancel button
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

// Event listener for cancel button in settings
const cancelButton = document.querySelector("[data-settings-cancel]");
cancelButton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
});

/**
 * Toggle the display of book details in the overlay
 * @param {Event} event - The click event
 */
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

// Event listener for closing details overlay
const closeDetails = document.querySelector("[data-list-close]");
closeDetails.addEventListener("click", (event) => {
  document.querySelector("[data-list-active]").style.display = "none";
});

// Event listener for clicking on book previews
const click = document.querySelector('[data-list-items]');
click.addEventListener('click', toggleDetails);

// Event listener for cancel button in settings
const cancelButtn = document.querySelector('[data-settings-cancel]')
cancelButtn.addEventListener("click", () => {
});

// Add options for authors to the search filter
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

// Add options for genres to the search filter
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

// Event listener for search button in search overlay
const searchButton2 = document.querySelector("[data-search-button]"); // Corrected selector
searchButton2.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.querySelector("[data-search-title]").value;
  const author = document.querySelector("[data-search-authors]").value;
  const genre = document.querySelector("[data-search-genres]").value;

  // Filter books based on search criteria
  const filteredBooks = books.filter((book) => {
    const titleMatch = !title || book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === "any" || book.author === author;
    const genreMatch = genre === "any" || book.genres.includes(genre);
    return titleMatch && authorMatch && genreMatch;
  });

   // Create a document fragment for search results
  const searchResultFragment = document.createDocumentFragment();

  
  // Append search result items to the fragment
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

  // Clear and append search results to the book list in the DOM
  const bookList = document.querySelector("[data-list-items]");
  bookList.innerHTML = "";
  bookList.appendChild(searchResultFragment);
});
  const bookList = document.querySelector("[data-list-items]");
  bookList.innerHTML = "";
  bookList.appendChild(searchResultFragment);
;

// Additional event listeners for search and cancel buttons
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





