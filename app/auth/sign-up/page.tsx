"use client";
import Button from "@/components/button/Button";
import { Label, TextInput } from "flowbite-react";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { EMAIL_SIGNUP_URL } from "@/lib/apiAuthRoutes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const signInWithGoogle = () => {
    setIsLoading(true);
    signIn("google", {
      callbackUrl: "/mentors",
    });
    setIsLoading(false);
  };

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await axios.post(EMAIL_SIGNUP_URL, {
        name: "usr" + String(Math.random() * 10000),
        email: data.email,
        password: data.password,
        oauth_provider: "email",
      });
      router.push("/auth/sign-in");
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      className="w-full h-screen overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 3 }}
    >
      <div className="flex justify-center items-center h-screen">
        <form
          className="flex w-4/12 flex-col gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
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
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>

          <Button
            variant="Blue"
            type="submit"
            text="Submit"
            isLoading={isLoading}
            disabled={isLoading}
          />
          <div className="flex items-center gap-2">
            <div className="w-full border border-gray-700" />
            or
            <div className="w-full  border border-gray-700" />
          </div>
          <Button
            onClick={signInWithGoogle}
            disabled={isLoading}
            variant="Blue"
            text="Continue with Google"
          />
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
