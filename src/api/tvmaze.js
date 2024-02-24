const BASE_URL = "https://api.tvmaze.com";

const apiGet = async (queryString) => {
  const response = await fetch(`${BASE_URL}${queryString}`); // made the request as dynamic using ${}
  const body = await response.json();

  return body;
};

export const searchForShows = (query) => apiGet(`/search/shows?q=${query}`); // it is a reusable function
