import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

//conitions that check whether there is content to display. 
let range = books.length
//page = 1;

if (!books || !Array.isArray(books)) {
throw new Error('Source required') 
};
if (!range || range.length < 2) {
throw new Error('Range must be an array with two numbers')
};


//the homepage previews
const homePageBookPreviews = document.createDocumentFragment();
const extractedBooks = books.slice(0, 36); // Store the extracted book data in a variable

for (let i = 0; i < extractedBooks.length; i++) {
  const { image, title, id, published, author } = extractedBooks[i]; // Destructuring to target certain aspects
  const homePreview = document.createElement('dl'); // Create the dl element for the preview
  homePreview.className = 'preview'; // Give it a class name
  homePreview.dataset.id = id;
  homePreview.dataset.image = image;
  homePreview.dataset.title = title;
  
  // Access the author's name using the author's code
  const authorName = authors[author];
  
  homePreview.dataset.subtitle = `${authorName} (${new Date(published).getFullYear()})`;
  // Convert genres array to a comma-separated string or use a different format as needed
  homePreview.dataset.genre = extractedBooks[i].genres.join(', ');
  homePreview.innerHTML = `
    <div>
      <img class='preview__image' src='${image}' alt='Picture of the book'/>
    </div>
    <div class='preview__info'>
      <dt class='preview__title'>${title}</dt>
      <dt class='preview__author'>By ${authorName}</dt>
    </div>
  `;
  homePageBookPreviews.appendChild(homePreview);
}

const fullBookList = document.querySelector('[data-list-items]'); 
fullBookList.appendChild(homePageBookPreviews);


//colors for night and day
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

//setting up the buttons for theme toggle
const themeToggle = document.querySelector('[data-header-settings]') //button for night/day toggle
const themeSelector = document.querySelector('[data-settings-overlay]') //buttons for choosing night/day
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"); //save button

// Function to set the theme based on user's system preference
function setThemeBasedOnSystemPreference() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    

themeToggle.addEventListener('click', ()=>{themeChoice})
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")

saveButton.addEventListener('click', (event) =>{event.preventDefault()
    if (dataSettingsTheme.value === 'day') {
      document.querySelector('body').style.setProperty('--color-dark', day.dark)
      document.querySelector('body').style.setProperty('--color-light', day.light)
    }
    if (dataSettingsTheme.value === 'night') {
      document.querySelector('body').style.setProperty('--color-dark', night.dark)
      document.querySelector('body').style.setProperty('--color-light', night.light)
    }
  })


//set the users preferred theme up
// const defaultTheme = querySelector('[data-settings-theme]').value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);
// / data-settings-overlay.submit; {
//         preventDefault()
//         const formData = new FormData(event.target)
//         const result = Object.fromEntries(formData)
//         document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//         document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//         data-settings-overlay).open === false
//     }


// genres = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element = 'All Genres'
// genres.appendChild(element)

// for ([id, name]; Object.entries(genres); i++) {
//     document.createElement('option')
//     element.value = value
//     element.innerText = text
//     genres.appendChild(element)
// }

// data-search-genres.appendChild(genres)

// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

// 


// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data-list-button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

// data-search-cancel.click() { data-search-overlay.open === false }
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// data-list-button.click() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }



// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if (active) break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if (!active) return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }
