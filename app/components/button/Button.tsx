"use client";
import clsx from "clsx";
import React from "react";

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        "p-2 text-btntext font-bold rounded-md ",
        !disabled && " bg-blue-600",
        disabled && "bg-blue-400 cursor-not-allowed"
      )}
    >
      {text}
    </button>
  );
};

export default Button;
