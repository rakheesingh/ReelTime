import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input Component", () => {
  it("should render the input with the correct value", () => {
    const mockHandleSelection = jest.fn();
    const mockValue = "Test Value";
    const mockRequestParam = "param";

    render(
      <Input
        value={mockValue}
        handleSelection={mockHandleSelection}
        requestParam={mockRequestParam}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(mockValue);
    
  });

  it("should call handleSelection with the correct arguments on input change", () => {
    const mockHandleSelection = jest.fn();
    const mockRequestParam = "param";

    render(
      <Input
        value=""
        handleSelection={mockHandleSelection}
        requestParam={mockRequestParam}
      />
    );

    const inputElement = screen.getByRole("textbox");
    const newValue = "New Value";

    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(mockHandleSelection).toHaveBeenCalledTimes(1);
    expect(mockHandleSelection).toHaveBeenCalledWith(newValue, mockRequestParam);
  });

  it("should have the correct class applied", () => {
    const mockHandleSelection = jest.fn();

    render(
      <Input
        value=""
        handleSelection={mockHandleSelection}
        requestParam=""
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("py-1 rounded-md outline-none border border-gray-500 px-3");
  });
});
