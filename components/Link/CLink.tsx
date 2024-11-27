"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
interface Props {
  text?: string;
  redirectTo: string;
  hasBackground?: boolean;
  children?: React.ReactNode;
}

const CLink = ({ text, redirectTo, hasBackground = true, children }: Props) => {
  return (
    <motion.div
      whileHover={{
        scale: "1.1",
      }}
      transition={{
        duration: "1",
        ease: "easeInOut",
      }}
    >
      <Link
        href={redirectTo}
        className={clsx(
          "p-2 text-btntext font-semibold",
          !hasBackground && " rounded-md text-black",
          hasBackground && " rounded-md bg-blue-600"
        )}
      >
        {text} {children}
      </Link>
    </motion.div>
  );
};

export default CLink;
