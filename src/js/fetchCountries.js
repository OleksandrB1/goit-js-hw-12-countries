const fetchCountries = searchQuery => {
  const LINK = 'https://restcountries.eu/rest/v2/name/';
  let url = `${LINK}${searchQuery}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
};

export default fetchCountries;