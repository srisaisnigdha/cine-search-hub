const BASE_URL = 'https://api.tvmaze.com';

const apiGet = async queryString => {
  const response = await fetch(`${BASE_URL}${queryString}`); // made the request as dynamic using ${}
  const body = await response.json();

  return body;
};

export const searchForShows = query => apiGet(`/search/shows?q=${query}`); // it is a reusable function to query for shows endpoint
export const searchForPeople = query => apiGet(`/search/people?q=${query}`); // it is a reusable function to query for actors endpoint
export const getShowById = showId =>
  apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`);
