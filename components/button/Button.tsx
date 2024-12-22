"use client";

import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Spinner } from "flowbite-react";
import { motion } from "framer-motion";

type Variant = "Blue" | "Red" | "White";

interface Props {
  type?: "button" | "submit" | "reset";
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant: Variant;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  type = "button",
  text,
  onClick,
  disabled = false,
  variant,
  isLoading = false,
  children,
}: Props) => {
  const variantClasses = {
    Blue: "bg-blue-600 text-white hover:bg-blue-500 w-full",
    Red: "bg-red-600 text-white hover:bg-red-500",
    White: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-100",
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <ShadcnButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={
          `${variantClasses[variant]} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } flex justify-center items-center gap-2`
        }
      >
        {isLoading ? <Spinner size="sm" className="text-current" /> : text}
        {children}
      </ShadcnButton>
    </motion.div>
  );
};

export default Button;