let apiQuotes = [];

const quoteCard = document.querySelector(".quote-card");
const quoteLoader = document.querySelector(".quote-wrapper__loader");
const quoteText = document.querySelector(".quote-card__quote-text");
const quoteAuthorText = document.querySelector(".quote-card__author-name");
const newQuoteButton = document.querySelector(".quote-card__new-quote-button");
const twitterButton = document.querySelector(".quote-card__twitter-button");

function showLoadingSpinner() {
  quoteLoader.hidden = false;
  quoteCard.hidden = true;
}

function removeLoadingSpinner() {
  if (!quoteLoader.hidden) {
    quoteCard.hidden = false;
    quoteLoader.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!apiQuotes.length) {
    throw "Data does not exist";
  }

  if (!quote.author) {
    quoteAuthorText.textContent = "Unkown";
  } else {
    quoteAuthorText.textContent = quote.author;
  }
  if (quote.text.length > 110) {
    quoteText.classList.add("quote-card__quote-text--long");
  } else {
    quoteText.classList.remove("quote-card__quote-text--long");
  }
  quoteText.textContent = quote.text;
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
    quoteText.textContent = "Whoops, Failed to get data.";
    quoteAuthorText.textContent = "Are you connected to the Internet?";
  }
  removeLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// // On Load
getQuotes();
