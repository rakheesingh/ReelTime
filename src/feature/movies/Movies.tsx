import React, { Children, createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import Tabs, { useTabs } from "../../designSystem/tabs/Tabs";
import { MOVIE_TAB_DETAILS, MOVIE_TABS } from "../../utils/constants/constant";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovieListFilter } from "./network";
import MovieCard from "./MovieCard";
import List from "./list";
import { MovieProp } from "./MovieInterface";
import Filter from "../movieFilter/Filter";

export default function Movies() {
  const tab = useTabs();
  const tabDetails = MOVIE_TAB_DETAILS[tab.activeTab] || {};
  const [apiQuery, setAPIQuery] = useState("");

  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery({
    queryKey: [tab.activeTab, apiQuery],
    queryFn: getMovieListFilter(tabDetails.apiName, apiQuery),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
  });

  const movieList = data?.pages.flatMap((page) => page.results) || [];

  if (error || !movieList) return <>Error while loading movie list</>;
  return (
    <>
      {tab.activeTab === MOVIE_TABS.ALL ? (
        <div className="w-full flex ">
          <FilterContextProvider>
          <Filter setAPIname={setAPIQuery}/>
          <List
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            list={movieList}
            renderElement={(movie: MovieProp) => <MovieCard {...movie} />}
          />
          </FilterContextProvider>
        </div>
      ) : (
        <List
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          list={movieList}
          renderElement={(movie: MovieProp) => <MovieCard {...movie} />}
        />
      )}
    </>
  );
}


interface FilterContextType {
  filtersStatus: object;
  setFilterStatus: Dispatch<SetStateAction<Record<string, unknown>>>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

function FilterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filtersStatus, setFilterStatus] = useState<Record<string, unknown>>(
    {}
  );

  return (
    <FilterContext.Provider value={{ filtersStatus, setFilterStatus }}>
      {children}
    </FilterContext.Provider>
  );
}
