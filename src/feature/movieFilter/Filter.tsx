import React, { useContext } from "react";
import { movieFilterData } from "./constant";
import ButtonCheckbox from "../../designSystem/checkbox/ButtonCheckbox";
import Input from "../../designSystem/input/Input";
import ProgressBar from "../../designSystem/progressBar/ProgressBar";
import { FilterContext } from "../movies/Movies";

interface FilterProps {
  setAPIname: Function;
}

const mapFilter = {
  [movieFilterData.Genres.type]: {
    renderComponent: (props: any) => <ButtonCheckbox {...props} />,
  },
  [movieFilterData.Keywords.type]: {
    renderComponent: (props: any) => <Input {...props} />, // Replace with appropriate component
  },
  [movieFilterData.Userscore.type]: {
    renderComponent: (props: any) => (
      <ProgressBar
        {...props}
        minQuery={props.requestParam[1]}
        maxQuery={props.requestParam[0]}
      />
    ), // Replace with appropriate component
  },
};

export default function Filter({ setAPIname }: FilterProps) {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("Filter must be used within a FilterContext.Provider");
  }

  const { filtersStatus, setFilterStatus } = context;
  console.log("filtersStatus", filtersStatus);

  const handleSelection = (value: string, component: string) => {
    setFilterStatus((prevState) => {
      // Construct the new state
      const newApiArg = {
        ...prevState,
        [component]: value,
      };

      // Update the API query
      const apiQuery: string[] = [];
      for (let query in newApiArg) {
        apiQuery.push(`${query}=${newApiArg[query]}`);
      }
      setAPIname(apiQuery.join("&"));

      // Return the updated state
      return newApiArg;
    });
  };

  return (
    <div className="flex sm:flex-col p-4 gap-4 w-4/12">
      {Object.entries(movieFilterData).map(([key, value]: [string, any]) => {
        const Component = mapFilter[value.type]?.renderComponent;
        console.log(value, value.type, "rakhee");
        if (Component) {
          return (
            <div key={key} className="flex flex-col gap-2">
              <label>{key}</label>
              {Component({
                ...value,
                handleSelection: handleSelection,
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
