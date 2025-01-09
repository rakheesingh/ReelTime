import React, { ReactNode } from "react";
import classNames from "classnames";

/**
 * Button component to handle most user interactions.
 */

interface ButtonProps {
  className?: string; // Optional
  variant?: "primary" | "secondary" | "tertiary"; // Optional with specific values
  children: ReactNode;
  loading?: boolean; // Optional
  startIcon?: ReactNode; // Optional
  onClick: Function; // Optional function with typing
  disabled?: boolean; // Optional
}

export default function Button({
  className,
  variant = "primary", // Default value
  children,
  loading = false, // Default value
  startIcon,
  onClick = () => {}, // Default function
  disabled = false, // Default value
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    const isDisabled = disabled || loading;
    if (isDisabled) {
      return null;
    }
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={classNames(
        // Common styles for all variants
        "text-base items-center justify-center flex rounded disabled:opacity-30 disabled:cursor-not-allowed",
        {
          "px-2.5 py-3 bg-brand-blue-1 text-white font-medium hover:bg-brand-blue-2 active:bg-brand-blue-3":
            variant === "primary",
        },
        {
          "px-2.5 py-3 bg-white border-secondary border-medium-gray text-gray-500 font-medium hover:text-brand-blue-2 hover:border-brand-blue-2 active:text-brand-blue-3 active:border-brand-blue-3":
            variant === "secondary",
        },
        {
          "text-gray-700 font-medium hover:text-brand-blue-1 active:text-brand-blue-3":
            variant === "tertiary",
        },
        className
      )}
      {...props}
    >
      {startIcon && <div className="ml-1 mr-2">{startIcon}</div>}
      {children}
    </button>
  );
}
