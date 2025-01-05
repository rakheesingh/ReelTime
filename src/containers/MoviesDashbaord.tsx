import React from "react";
import Tabs, { useTabs } from "../designSystem/tabs/Tabs";
import { MOVIE_TABS } from "../utils/constants/constant";
import Movies from "../feature/movies/Movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function MoviesDashbaord({}) {
  const tab = useTabs();
  console.log(tab);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Tabs tabs={MOVIE_TABS}></Tabs>
        <Movies />
      </QueryClientProvider>
    </>
  );
}
