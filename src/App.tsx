import React from "react";
import Layout from "./layout";
import MoviesDashbaord from "./containers/MoviesDashbaord";
import { TabContext } from "./designSystem/tabs/Tabs";
import { MOVIE_TABS } from "./utils/constants/constant";

const App = () => {
  console.log("process.env.REACT_APP_BEARER_TOKEN", process.env.REACT_APP_BEARER_TOKEN);

  return (
    <TabContext defaultTab={MOVIE_TABS.ALL}>
      <Layout>
        <MoviesDashbaord />
      </Layout>
    </TabContext>
  );
};

export default App;
