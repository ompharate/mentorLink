"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    title: "Learn Python Programming",
    profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "Learn Python programming with Python Tutor",
    fees: "₹400/Hr",
  },
  {
    id: 2,
    title: "Learn Java Programming",
    profileImg: "https://randomuser.me/api/portraits/women/39.jpg",
    content: "Learn Java programming with Java Tutor",
    fees: "₹900/Hr",
  },
  {
    id: 3,
    title: "Learn javascript Programming",
    profileImg: "https://randomuser.me/api/portraits/men/92.jpg",
    content: "Learn C++ programming with C++ Tutor",
    fees: "₹300/Hr",
  },
  {
    id: 4,
    title: "Learn Go Programming",
    profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "Learn C++ programming with C++ Tutor",
    fees: "₹100/Hr",
  },
  {
    id: 5,
    title: "Learn Rust Programming",
    profileImg: "https://randomuser.me/api/portraits/men/75.jpg",
    content: "Learn C++ programming with C++ Tutor",
    fees: "₹120/Hr",
  },
  {
    id: 6,
    title: "Learn php Programming",
    profileImg: "https://randomuser.me/api/portraits/women/88.jpg",
    content: "Learn C++ programming with C++ Tutor",
    fees: "₹1000/Hr",
  },
];

const Example = () => {
  const getRandomDirection = () => {
    return Math.random() > 0.5 ? "left" : "right";
  };

  return (
    <div className="overflow-hidden max-w-7xl mx-auto flex flex-col ">
      {data.map((item, index) => {
        return (
          <motion.div
            key={item.id}
            id={`item-${index}`}
            initial={{
              opacity: 0,
              x: getRandomDirection() === "left" ? -300 : 300,
            }}
            animate={{
              opacity: 100,
              x: 0,
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className="bg-blue-600 p-6 mb-4 rounded-md"
          >
            <div
              style={{
                float: getRandomDirection(),
              }}
              className="flex items-center space-x-4 "
            >
              <img
                className="w-20 h-20 rounded-full"
                src={item.profileImg}
                alt={item.title}
              />
              <div>
                <h1 className="text-white text-xl font-bold">{item.title}</h1>
                <p className="text-white text-sm">{item.content}</p>
                <p className="text-white text-sm">{item.fees}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Example;
