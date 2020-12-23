let apiQuotes = [];

const quoteCardElement = document.getElementsByClassName("quote-card")[0];
const quoteLoaderElement = document.getElementsByClassName(
  "quote-wrapper__loader"
)[0];
const quoteTextElement = document.getElementsByClassName(
  "quote-card__quote-text"
)[0];
const quoteAuthorTextElement = document.getElementsByClassName(
  "quote-card__author-name"
)[0];
const newQuoteButtonElement = document.getElementsByClassName(
  "quote-card__new-quote-button"
)[0];
const twitterButtonElement = document.getElementsByClassName(
  "quote-card__twitter-button"
)[0];

function showLoadingSpinner() {
  quoteLoaderElement.hidden = false;
  quoteCardElement.hidden = true;
}

function removeLoadingSpinner() {
  if (!quoteLoaderElement.hidden) {
    quoteCardElement.hidden = false;
    quoteLoaderElement.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!apiQuotes.length) {
    throw "Data does not exist";
  }

  if (!quote.author) {
    quoteAuthorTextElement.textContent = "Unkown";
  } else {
    quoteAuthorTextElement.textContent = quote.author;
  }
  if (quote.text.length > 110) {
    quoteTextElement.classList.add("quote-card__quote-text--long");
  } else {
    quoteTextElement.classList.remove("quote-card__quote-text--long");
  }
  quoteTextElement.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    quoteTextElement.textContent = "Whoops, Failed to get data.";
    quoteAuthorTextElement.textContent = "Are you connected to the Internet?";
  }
  removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteTextElement.innerText;
  const author = quoteAuthorTextElement.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButtonElement.addEventListener("click", newQuote);
twitterButtonElement.addEventListener("click", tweetQuote);

// // On Load
getQuotes();
