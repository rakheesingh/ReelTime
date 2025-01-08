import React, { useState } from "react";
import Button from "../button/Button";
import classNames from "classnames";

interface ButtonCheckboxProps {
  checkBoxData: Record<string, string>; // Assuming checkBoxData maps keys to string values
  handleSelection: (selectedItems: string, type: string) => void; // Pass the updated selection to the parent
  type: string;
  requestParam: string;
}

export default function ButtonCheckbox({
  checkBoxData,
  handleSelection,
  requestParam,
}: ButtonCheckboxProps) {
  const [selectedCheck, setSelectedCheck] = useState<string[]>([]);

  const handleButtonCheck = (value: string) => {
    setSelectedCheck((prev) => {
      const isAlreadySelected = prev.includes(value);
      const updatedSelection = isAlreadySelected
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      handleSelection(updatedSelection.join(","), requestParam); // Notify the parent component
      return updatedSelection;
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(checkBoxData).map((key) => (
        <Button
          key={key}
          variant="tertiary"
          className={classNames(
            `p-2 rounded-2xl text-sm text-white bg-red-600 cursor-pointer`,
            {
              "bg-green-800": selectedCheck.includes(checkBoxData[key]),
            }
          )}
          onClick={() => handleButtonCheck(checkBoxData[key])}
        >
          {key}
        </Button>
      ))}
    </div>
  );
}
