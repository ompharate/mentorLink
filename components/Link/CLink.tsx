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
        scale: 1.05,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="inline-block"
    >
      <Link
        href={redirectTo}
        className={clsx(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
          hasBackground
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
            : "text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500"
        )}
      >
        {text}
        {children && <span className="ml-2">{children}</span>}
      </Link>
    </motion.div>
  );
};

export default CLink;