"use client";
import Button from "@/components/button/Button";
import { Label, TextInput } from "flowbite-react";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSignIn = async (data: FormData) => {
    setError("");
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/mentors",
      redirect: false,
    });
    if (result?.ok) {
      setError("");
      return router.push("/mentors");
    }
    setError("User not found please first register");
    setIsLoading(false);
  };

  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/mentors" });
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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Link href="/">
            <MoveLeft color="black" />
          </Link>
          <div className="flex justify-center gap-2">
            <Image src={"/logo.png"} alt="logo" width={25} height={25} />
            <h1 className="text-center text-xl font-semibold">Sign In</h1>
          </div>
          {error && <span className="text-red-600">{error}</span>}
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

          <Button variant="Blue" text="Submit" isLoading={isLoading} />
          <div className="flex items-center gap-2">
            <div className="w-full border border-gray-700" />
            or
            <div className="w-full border border-gray-700" />
          </div>
          <Button
            onClick={signInWithGoogle}
            variant="Blue"
            text="Continue with Google"
          />
        </form>
      </div>
    </motion.div>
  );
};

export default SignIn;
