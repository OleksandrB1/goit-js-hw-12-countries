
  
import countriesLink from './js/fetchCountries.js';
import countryCard from './templates/country-container.hbs';
import countriesList from './templates/list.hbs';
import getRefs from './js/refs.js';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = getRefs();
const debounce = require('lodash.debounce');
let foundedCountry = '';

refs.input.addEventListener(
  'input',
  debounce(() => {
    onSearch();
  }, 500),
);

function onSearch() {
  resetSearch();
  foundedCountry = refs.input.value;
  countriesLink(foundedCountry)
    .then(renderMarkup)
    .catch(err => console.log(err));
}
function resultMessage(typeInfo, textInfo) {
  typeInfo({
    text: `${textInfo}`,
    delay: 3000,
    closerHover: true,
  });
}

function resetSearch() {
  refs.countriesContainer.innerHTML = '';
}

function renderMarkup(countries) {
  if (countries.length === 1) {
    resetSearch();
    markupCountries(countryCard, countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    resetSearch();
    markupCountries(countriesList, countries);
  } else if (countries.length > 10) {
    resultMessage(
      error,
      'To many matches found. Please enter a more specific query!',
    );
  } else {
    resultMessage(info, 'No matches found!');
  }
}


function markupCountries(card, countries) {
  refs.countriesContainer.insertAdjacentHTML('beforeend', card(countries));
}