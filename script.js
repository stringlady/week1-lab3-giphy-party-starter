// Global Constants
const apiKey = "U2M3MZsxHNUWLHygMueNTgvcKi5KbB7z"
const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const display = document.getElementById("display");
const limit = 8;
const loadButton = document.querySelector(".hidden");
var page_num = 0;
var offset = 0;

/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
  console.log(results);
    display.innerHTML += `
    <div class="all">
      <img class="image" src="${results.images.original.url}">
      </div>
   `
}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
  //const url = "https://api.giphy.com/v1/gifs/search?api_key=".concat(apiKey, "&q=", searchTerm, "&limit=", limit, "&offset=", offset, "&rating=g&lang=en");
  const url = `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&rating=g&lang=en&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();
  data.data.forEach(element => {
    displayResults(element);
  });
  //console.log(data.data);
  //console.log(displayResults(data));
  //displayResults(data);
  //return neW;
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  display.innerHTML = '';
  //displayResults(getGiphyApiResults(searchInput.value));
  getGiphyApiResults(searchInput.value);
  loadButton.classList.remove("hidden");
}



/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
  page_num += 1;
  event.preventDefault();
  offset = page_num * limit;
  getGiphyApiResults(searchInput.value);
  console.log(offset);
}



window.onload = function () {
  // YOUR CODE HERE
  // Add any event handlers here
  searchForm.addEventListener("submit", handleFormSubmit);
  loadButton.addEventListener("submit", handleShowMore);
  console.log(loadButton.classList);
  
}
