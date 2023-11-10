//Import the values from the data file
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

//check if the books object is an array and it is defined
if (!books || !Array.isArray(books)) {
throw new Error('Source required') 
};


//THE HOMEPAGE PREVIEWS

//create the document fragment ti store and evntually display the book previews
const homePageBookPreviews = document.createDocumentFragment();

/**
 * Creates HTML elements for a book based on its properties.
 *
 * @param {object} book - The book object with properties like title, author, etc.
 * @returns {HTMLElement} - The HTML element representing the book preview.
 */

const createBookElements = (books) => {
    //destructure all elements i will need in the code, even for later use
    const { author, id, image, title, description, published, genres } = books;
    const authorName = authors[author];

// Create a 'dl' element for the book preview
const bookElement = document.createElement('dl'); 
  bookElement.className = 'preview'; // Give it a class name
  bookElement.dataset.id = id;
  bookElement.dataset.image = image;
  bookElement.dataset.title = title;
  bookElement.dataset.subtitle = `${authorName} (${new Date(published).getFullYear()})`;
  bookElement.dataset.genre = genres.join(', ');

  
//Use template literals to set up inner HTML
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


//extract and store the 36 books for home page preview
const extractedBooks = books.slice(0, 36);

//look through extracted books and display the preview

for (const bookObj of extractedBooks) {
    const newBook = createBookElements(bookObj);
    homePageBookPreviews.appendChild(newBook);
}

//Append the previews to the 'data-list-items'
const fullBookList = document.querySelector('[data-list-items]'); 
fullBookList.appendChild(homePageBookPreviews);



//THEME
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

//create an object to easily reference and store data from html 
const themeELementReference = {
    headerIcon: document.querySelector('[data-header-settings]'),
    overlay: document.querySelector('[data-settings-overlay]'),
    theme: document.querySelector('[data-settings-theme]'),
    saveButton: document.querySelector(button.overlay__button.overlay__button_primary[form='settings']),
    cancelButton: document.querySelector('[data-settings-cancel]');
}
// // Set the user's preferred theme
// const defaultTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

// document.documentElement.style.setProperty('--color-dark', css[defaultTheme].dark);
// document.documentElement.style.setProperty('--color-light', css[defaultTheme].light);

// // Handle form submission for theme change
// data-settings-overlay.submit = function (event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const result = Object.fromEntries(formData);
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay.open = false;
// };

// // Populate genres dropdown
// const genres = document.createDocumentFragment();
// let element = document.createElement('option');
// element.value = 'any';
// element.innerText = 'All Genres'; // Corrected assignment
// genres.appendChild(element);

// for (const [id, name] of Object.entries(genres)) {
//     element = document.createElement('option');
//     element.value = id;
//     element.innerText = name;
//     genres.appendChild(element);
// }


// genres.appendChild(genres);



// // Populate authors dropdown
// const authors = document.createDocumentFragment();
// element = document.createElement('option');
// element.value = 'any';
// element.innerText = 'All Authors';
// authors.appendChild(element);

// for (const [id, name] of Object.entries(authors)) {
//     element = document.createElement('option');
//     element.value = id;
//     element.innerText = name;
//     authors.appendChild(element);
// }

// data-search-authors.appendChild(authors);

// // Handle show more button click
// data-list-button.click = function () {
//     document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE));
//     actions.list.updateRemaining();
//     page = page + 1;
// };

// // Handle search form submission
// data-search-form.submit = function (event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const filters = Object.fromEntries(formData);
//     const result = [];

//     for (const book of booksList) {
//         const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
//         const authorMatch = filters.author === 'any' || book.author === filters.author;
//         const genreMatch = filters.genre === 'any' || (book.genres && book.genres.includes(filters.genre));

//         if (titleMatch && authorMatch && genreMatch) {
//             result.push(book);
//         }
//     }

//     if (result.length < 1) {
//         data-list-message.classList.add('list__message_show');
//     } else {
//         data-list-message.classList.remove('list__message_show');
//     }

//     data-list-items.innerHTML = '';
//     const fragment = document.createDocumentFragment();
//     const extracted = result.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);

//     for (const { author, image, title, id } of extracted) {
//         element = document.createElement('button');
//         element.classList = 'preview';
//         element.setAttribute('data-preview', id);

//         element.innerHTML = /* html */ `
//             <img class="preview__image" src="${image}" />
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `;

//         fragment.appendChild(element);
//     }

//     data-list-items.appendChild(fragment);
//     const initial = result.length - (page * BOOKS_PER_PAGE);
//     const remaining = hasRemaining ? initial : 0;
//     data-list-button.disabled = initial > 0;

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `;

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false;
// };

// // Handle list items click
// data-list-items.click = function (event) {
//     const pathArray = Array.from(event.path || event.composedPath());
//     let active;

//     for (const node of pathArray) {
//         if (active) break;
//         const previewId = node?.dataset?.preview;

//         for (const singleBook of books) {
//             if (singleBook.id === previewId) active = singleBook;
//         }
//     }

//     if (!active) return;

//     data-list-active.open = true;
//     data-list-blur.style.backgroundImage = `url(${active.image})`;
//     data-list-title.innerText = active.title;
//     data-list-subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
//     data-list-description.innerText = active.description;
// };


// // //set up the buttons
// // const themeToggle = document.querySelector('[data-header-settings]'); // button for night/day toggle
// // const themeSelector = document.querySelector('[data-settings-overlay]'); // buttons for choosing night/day
// // const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"); // save button


// // // Function to set the theme based on user's system preference
// // function setThemeBasedOnSystemPreference() {
// //     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
// //     if (prefersDarkMode) {
// //         document.querySelector('body').style.setProperty('--color-dark', night.dark);
// //         document.querySelector('body').style.setProperty('--color-light', night.light);
// //         themeSelector.value = 'night';
// //     } else {
// //         document.querySelector('body').style.setProperty('--color-dark', day.dark);
// //         document.querySelector('body').style.setProperty('--color-light', day.light);
// //         themeSelector.value = 'day';
// //     }
// // }

// // setThemeBasedOnSystemPreference(); // Call the function to set the initial theme

// // // Event listener for user choosing an alternative theme
// // themeToggle.addEventListener('click', () => {
// //     if (themeSelector.value === 'day') {
// //         // Switch to the night theme
// //         document.querySelector('body').style.setProperty('--color-dark', night.dark);
// //         document.querySelector('body').style.setProperty('--color-light', night.light);
// //         themeSelector.value = 'night';
// //     } else {
// //         // Switch to the day theme
// //         document.querySelector('body').style.setProperty('--color-dark', day.dark);
// //         document.querySelector('body').style.setProperty('--color-light', day.light);
// //         themeSelector.value = 'day';
// //     }
// // });

// // // Save button for confirming options
// // saveButton.addEventListener('click', (event) => {
// //     event.preventDefault();

// //     if (themeSelector.value === 'day') {
// //         document.querySelector('body').style.setProperty('--color-dark', day.dark);
// //         document.querySelector('body').style.setProperty('--color-light', day.light);
// //     }
// //     if (themeSelector.value === 'night') {
// //         document.querySelector('body').style.setProperty('--color-dark', night.dark);
// //         document.querySelector('body').style.setProperty('--color-light', night.light);
// //     }
// // });



// //set the users preferred theme up
// // const defaultTheme = querySelector('[data-settings-theme]').value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// // v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// // documentElement.style.setProperty('--color-dark', css[v].dark);
// // documentElement.style.setProperty('--color-light', css[v].light);
// // / data-settings-overlay.submit; {
// //         preventDefault()
// //         const formData = new FormData(event.target)
// //         const result = Object.fromEntries(formData)
// //         document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
// //         document.documentElement.style.setProperty('--color-light', css[result.theme].light);
// //         data-settings-overlay).open === false
// //     }


// // genres = document.createDocumentFragment()
// // element = document.createElement('option')
// // element.value = 'any'
// // element = 'All Genres'
// // genres.appendChild(element)

// // for ([id, name]; Object.entries(genres); i++) {
// //     document.createElement('option')
// //     element.value = value
// //     element.innerText = text
// //     genres.appendChild(element)
// // }

// // data-search-genres.appendChild(genres)

// // authors = document.createDocumentFragment()
// // element = document.createElement('option')
// // element.value = 'any'
// // element.innerText = 'All Authors'
// // authors.appendChild(element)

// // for ([id, name];Object.entries(authors); id++) {
// //     document.createElement('option')
// //     element.value = value
// //     element = text
// //     authors.appendChild(element)
// // }

// // data-search-authors.appendChild(authors)

// // 


// // data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// // data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// // data-list-button.innerHTML = /* html */ [
// //     '<span>Show more</span>',
// //     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// // ]

// // data-search-cancel.click() { data-search-overlay.open === false }
// // data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// // data-settings-form.submit() { actions.settings.submit }
// // data-list-close.click() { data-list-active.open === false }

// // data-list-button.click() {
// //     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
// //     actions.list.updateRemaining()
// //     page = page + 1
// // }

// // data-header-search.click() {
// //     data-search-overlay.open === true ;
// //     data-search-title.focus();
// // }

// // data-search-form.click(filters) {
// //     preventDefault()
// //     const formData = new FormData(event.target)
// //     const filters = Object.fromEntries(formData)
// //     result = []

// //     for (book; booksList; i++) {
// //         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
// //         authorMatch = filters.author = 'any' || book.author === filters.author

// //         {
// //             genreMatch = filters.genre = 'any'
// //             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
// //         }

// //         if titleMatch && authorMatch && genreMatch => result.push(book)
// //     }

// //     if display.length < 1 
// //     data-list-message.class.add('list__message_show')
// //     else data-list-message.class.remove('list__message_show')
    

// //     data-list-items.innerHTML = ''
// //     const fragment = document.createDocumentFragment()
// //     const extracted = source.slice(range[0], range[1])

// //     for ({ author, image, title, id }; extracted; i++) {
// //         const { author: authorId, id, image, title } = props

// //         element = document.createElement('button')
// //         element.classList = 'preview'
// //         element.setAttribute('data-preview', id)

// //         element.innerHTML = /* html */ `
// //             <img
// //                 class="preview__image"
// //                 src="${image}"
// //             />
            
// //             <div class="preview__info">
// //                 <h3 class="preview__title">${title}</h3>
// //                 <div class="preview__author">${authors[authorId]}</div>
// //             </div>
// //         `

// //         fragment.appendChild(element)
// //     }
    
// //     data-list-items.appendChild(fragments)
// //     initial === matches.length - [page * BOOKS_PER_PAGE]
// //     remaining === hasRemaining ? initial : 0
// //     data-list-button.disabled = initial > 0

// //     data-list-button.innerHTML = /* html */ `
// //         <span>Show more</span>
// //         <span class="list__remaining"> (${remaining})</span>
// //     `

// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //     data-search-overlay.open = false
// // }



// // data-list-items.click() {
// //     pathArray = Array.from(event.path || event.composedPath())
// //     active;

// //     for (node; pathArray; i++) {
// //         if (active) break;
// //         const previewId = node?.dataset?.preview
    
// //         for (const singleBook of books) {
// //             if (singleBook.id === id) active = singleBook
// //         } 
// //     }
    
// //     if (!active) return
// //     data-list-active.open === true
// //     data-list-blur + data-list-image === active.image
// //     data-list-title === active.title
    
// //     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
// //     data-list-description === active.description
