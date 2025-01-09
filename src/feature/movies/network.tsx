const API_BASE = "https://api.themoviedb.org/3";

export const getMovieListFilter = (apiEndpoint: string, dynamicQuery:string) => {
  return async ({ pageParam = 1 }) => {
    console.log(`${API_BASE}/${apiEndpoint}?${dynamicQuery}&page=${pageParam}`, apiEndpoint);
    const response = await fetch(
      `${API_BASE}/${apiEndpoint}?${dynamicQuery}&page=${pageParam}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
        },
      }
    );


  if (!response.ok) {
    // Explicitly throw an error to handle HTTP errors
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

    const data = await response.json();

    // Simulating nextPage logic; adjust based on actual API structure
    return {
      ...data,
      nextPage: data.page < data.total_pages ? data.page + 1 : undefined,
    };
  };
};
