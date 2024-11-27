"use client";
import Button from "@/components/button/Button";
import { Label, TextInput } from "flowbite-react";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
const SignUp = () => {
  return (
    <motion.div
      className="w-full h-screen overflow-y-hidden"
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
      <div className="flex justify-center items-center h-screen ">
        <form className="flex w-4/12 flex-col gap-4">
          <Link href="/">
            <MoveLeft color="black" />
          </Link>
          <div className="flex justify-center gap-2">
            <Image src={"/logo.png"} alt="logo" width={25} height={25} />
            <h1 className="text-center text-xl font-semibold">Sign Up</h1>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@user.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>

          <Button variant="Blue" text="Submit" />
          <div className="flex items-center gap-2">
            <div className="w-full border border-gray-700" />
            or
            <div className="w-full  border border-gray-700" />
          </div>
          <Button variant="White" text="Continue with Google" />
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
