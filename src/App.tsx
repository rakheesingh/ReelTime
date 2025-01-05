import React from "react";
import Layout from "./layout";
import MoviesDashbaord from "./containers/MoviesDashbaord";
import { TabContext } from "./designSystem/tabs/Tabs";

const App = () => {
  return (
    <TabContext>
      <Layout>
        <MoviesDashbaord />
      </Layout>
    </TabContext>
  );
};

export default App;
