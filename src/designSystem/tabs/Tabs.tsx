import React, { createContext, ReactNode, useContext, useState } from "react";
import {MOVIE_TABS } from "../../utils/constants/constant";

// Define the type of the context value
interface TabsContextType {
  activeTab: string;
  switchTab: (tab: string) => void;
}

// Initialize the TabsContext with the appropriate type
const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabContext provider");
  }
  return context;
};

interface TabProps {
  children: ReactNode;
}

export const TabContext = ({ children }: TabProps) => {
  const [activeTab, setActiveTab] = useState<string>(MOVIE_TABS.ALL);
  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, switchTab }}>
      {children}
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  tabs: Record<string, string>;
}

const Tabs = ({ tabs }: TabsListProps) => {
  return (
    <div className="flex mx-2 mt-3 border-b border-brand-lightGrey">
      <TabList>
        {Object.values(tabs).map((tab) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>
    </div>
  );
};

const TabList = ({ children }: TabProps) => {
  return <div className="flex gap-6">{children}</div>;
};

const Tab = ({ children }: TabProps) => {
  const { activeTab, switchTab } = useTabs();

  return (
    <button
      className={`px-4 py-2 text-large font-medium ${
        activeTab === children
          ? "text-brand_lightBlue border-brand_lightBlue  border-b-2"
          : "text-brand_black border-transparent"
      } outline-none transition-all ease-in-out duration-100 cursor-pointer`}
      onClick={() => switchTab(children as string)} // Type casting to string
    >
      {children}
    </button>
  );
};

export default Tabs;
