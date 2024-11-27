"use client";
import clsx from "clsx";
import { Spinner } from "flowbite-react";
import React from "react";
import { motion } from "framer-motion";
type variant = "Blue" | "Red" | "White";
interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: variant;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  text,
  onClick,
  disabled = false,
  variant,
  isLoading = false,
  children,
}: Props) => {
  const buttonBackgroundColor = {
    Blue: "bg-blue-600",
    Red: "bg-red-600",
    White: "bg-white border border-gray-200 text-text",
  }[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        "p-2 text-btntext  rounded-md hover:bg-blue-500 flex justify-between",
        !disabled && buttonBackgroundColor,
        disabled && `bg-blue-400 cursor-not-allowed`
      )}
    >
      {!isLoading ? text : <Spinner color="info" />} {children}
    </motion.button>
  );
};

export default Button;
