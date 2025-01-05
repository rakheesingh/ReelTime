export const getMovieListFilter = (apiEndpoint: string) => {
  return async ({ pageParam = 1 }) => {
    console.log(pageParam, apiEndpoint);
    const response = await fetch(
      `https://api.themoviedb.org/3/${apiEndpoint}?language=en-US&page=${pageParam}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    console.log("response", data);

    // Simulating nextPage logic; adjust based on actual API structure
    return {
      ...data,
      nextPage: data.page < data.total_pages ? data.page + 1 : undefined,
    };
  };
};
