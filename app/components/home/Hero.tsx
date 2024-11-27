import React from "react";
import CLink from "../Link/CLink";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto text-center my-16">
      <motion.h1
        className="text-5xl font-extrabold p-2 text-text"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 100,
        }}
        transition={{
          duration: 2,
        }}
      >
        Skills for Today, Success for Tomorrow
      </motion.h1>
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 100,
        }}
        transition={{
          duration: 3,
        }}
        className="p-2 text-gray-500"
      >
        Learn from the best, at your own pace. Share your knowledge, inspire the
        world.
      </motion.p>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 100,
        }}
        transition={{
          duration: 3,
        }}
      >
        <CLink text="Get Started" redirectTo="/auth/sign-up" />
      </motion.div>
    </div>
  );
};

export default Hero;
