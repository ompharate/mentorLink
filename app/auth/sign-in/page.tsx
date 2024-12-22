"use client";
import Button from "@/components/button/Button";
import { Label, TextInput } from "flowbite-react";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { signInValidationSchema } from "@/lib/yup";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (values: { email: string; password: string }) => {
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/mentors",
      redirect: false,
    });

    if (result?.ok) {
      setError("");
      return router.push("/mentors");
    }

    setError("User not found, please register first.");
    setIsLoading(false);
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/mentors" });
    setIsLoading(false);
  };

  return (
    <motion.div
      className="w-full h-screen overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
    >
      <div className="flex justify-center items-center h-screen">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signInValidationSchema}
          onSubmit={handleSignIn}
        >
          {({ handleSubmit }) => (
            <Form className="flex w-4/12 flex-col gap-4">
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
                  <Label htmlFor="email" value="Your email" />
                </div>
                <Field                
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@user.com"
                  as={TextInput}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-600"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  as={TextInput}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-600"
                />
              </div>

              <Button
                onClick={() => handleSubmit()}
                variant="Blue"
                text="Submit"
                isLoading={isLoading}
              />
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
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default SignIn;
