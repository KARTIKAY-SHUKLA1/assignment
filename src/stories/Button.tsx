import React from "react";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Theme (light or dark) */
  theme?: "light" | "dark";
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  theme = "light",
  ...props
}) => {
  // Size variants
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm rounded-md",
    medium: "px-4 py-2 text-base rounded-lg",
    large: "px-5 py-3 text-lg rounded-xl",
  };

  // Theme + primary variants
  const baseClasses =
    "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const themeClasses = primary
    ? theme === "dark"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
    : theme === "dark"
    ? "bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-600"
    : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400";

  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]} ${themeClasses}`}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
