import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonCheckbox from "./ButtonCheckbox";

describe("Checkbox component", () => {
  const handleSelection = jest.fn();
  const CheckboxData = {
    Comedy: "28",
  };



  it("should render the checkbox button with the correct text", () => {
    render(
        <ButtonCheckbox
          requestParam="checkbox"
          handleSelection={handleSelection}
          checkBoxData={CheckboxData}
        />
      );
    const checkboxElement = screen.getByTestId("Comedy");
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveTextContent("Comedy");
  });

  it("clciking on button should call handleSelection function", () => {
    render(
        <ButtonCheckbox
          requestParam="checkbox"
          handleSelection={handleSelection}
          checkBoxData={CheckboxData}
        />
      );
    const checkboxElement = screen.getByTestId("Comedy");
    fireEvent.click(checkboxElement);
    expect(handleSelection).toHaveBeenCalledTimes(1);
    expect(handleSelection).toHaveBeenCalledWith("28", "checkbox")
  })



  // You can add more tests if necessary (e.g., check if `handleSelection` is called)
});
