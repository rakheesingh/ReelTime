// Define the type for each tab details
interface MovieTabDetails {
    id: string;
    tabName: string;
    apiName: string;
  }
  
  // Define the type for the MOVIE_TAB_DETAILS object
  export const MOVIE_TAB_DETAILS: Record<string, MovieTabDetails> = {
    Upcoming: { id: "1", tabName: "Upcoming", apiName: "movie/upcoming" },
    Popular: { id: "2", tabName: "Popular", apiName: "movie/popular" },
    Top_Rated: { id: "3", tabName: "Top Rated", apiName: "movie/top_rated" },
  };
  
  // Define the type for the MOVIE_TAB object
  export const MOVIE_TABS = {
    UPCOMING: "Upcoming",
    POPULAR: "Popular",
    TOP_RATED: "Top_Rated",
  } as const;
  
  // Optional: If you want to make sure MOVIE_TAB keys match the keys of MOVIE_TAB_DETAILS
  type MovieTabKeys = keyof typeof MOVIE_TAB_DETAILS; // "Upcoming" | "Popular" | "TOP_RATED"
  
  // Now TypeScript knows that MOVIE_TAB is a specific set of keys related to the tabs
  