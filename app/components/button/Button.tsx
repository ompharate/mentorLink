"use client";
import clsx from "clsx";
import { Spinner } from "flowbite-react";
import React from "react";

type variant = "Blue" | "Red" | "White";
interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: variant;
  isLoading?: boolean;
}

const Button = ({ text, onClick, disabled=false, variant, isLoading=false }: Props) => {
  const buttonBackgroundColor = {
    Blue: "bg-blue-600",
    Red: "bg-red-600",
    White: "bg-white border border-gray-200 text-text",
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        "p-2 text-btntext font-bold rounded-md ",
        !disabled && buttonBackgroundColor,
        disabled && `bg-blue-400 cursor-not-allowed`
      )}
    >
      {!isLoading ? text : <Spinner color="info"/>}
    </button>
  );
};

export default Button;
