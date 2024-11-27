"use client";
import { Button, Navbar } from "flowbite-react";
import Hero from "../components/home/Hero";
import CLink from "../components/Link/CLink";
import Example from "@/components/home/DynamicList";

export default function Home() {
  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src="/logo.png" className="mr-3 h-6 sm:h-9" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            MentorLink
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <CLink redirectTo="/auth/sign-in" text="Login" />
          <Navbar.Toggle />
        </div>
      </Navbar>
      <Hero />
      <Example />
    </div>
  );
}
