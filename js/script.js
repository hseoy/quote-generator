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
let errorCheck = false;

// Show Loading
function loading() {
  quoteLoaderElement.hidden = false;
  quoteCardElement.hidden = true;
}

// Hide Loading
function processComplete() {
  if (!quoteLoaderElement.hidden) {
    quoteCardElement.hidden = false;
    quoteLoaderElement.hidden = true;
  }
}
// Get Quote From API
async function getQuote() {
  loading();
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === "") {
      quoteAuthorTextElement.innerHTML = "Unkown";
    } else {
      quoteAuthorTextElement.innerHTML = data.quoteAuthor;
    }

    if (data.quoteText.length > 50) {
      quoteTextElement.classList.add("quote-card__quote-text--long");
    } else {
      quoteTextElement.classList.remove("quote-card__quote-text--long");
    }
    quoteTextElement.innerHTML = data.quoteText;
  } catch (error) {
    if (errorCheck) {
      console.error(error);
      errorCheck = false;
    } else {
      errorCheck = true;
      getQuote();
    }
  }
  processComplete();
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteTextElement.innerText;
  const author = quoteAuthorTextElement.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButtonElement.addEventListener("click", getQuote);
twitterButtonElement.addEventListener("click", tweetQuote);

// On Load
getQuote();
