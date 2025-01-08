import React from "react";

interface InputProps {
  value: string;
  handleSelection: Function;
  requestParam:string
}

export default function Input({ value, handleSelection, requestParam }: InputProps) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    handleSelection(e.target.value, requestParam);
  }
  return (
    <input
      value={value}
      data-key={"input"}
      onChange={handleInput}
      className="py-1 rounded-md outline-none border border-gray-500 px-3"
    />
  );
}
