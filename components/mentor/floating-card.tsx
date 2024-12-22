"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { allocateMentor, createOrder } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../button/Button";

interface Course {
  title: string;
  price: number;
  originalPrice: number;
  enrolledStudents: number;
  rating: number;
  mentorId: string;
}

interface Plan {
  amount: number;
  duration: string;
}

export function FloatingCard({ course }: { course: Course }) {
  const { data } = useSession();
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const discountPercentage = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  const plans: Plan[] = [
    { amount: course.price, duration: "30MIN" },
    { amount: course.price + 200, duration: "1HR" },
    { amount: course.price + 300, duration: "2HR" },
  ];

  const handlePayment = async () => {

    if (!plan) return;

    try {
      const { order } = await createOrder({ amount: plan.amount });

      if (order) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          order_id: order.id,
          currency: order.currency,
          name: "MentorLink",
          description: "Test Transaction",
          handler: async (response: any) => {
            await allocateMentor({
              userId: data?.user.id,
              mentorId: course.mentorId,
            });
            router.push("/mentors/my-mentors");
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isSticky ? "sticky top-4" : ""
      }`}
    >
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="aspect-video bg-muted mb-4 rounded-lg">
            <img
              src="https://learn.piyushgarg.dev/_next/image?url=https%3A%2F%2Fdcaj3bhl5hivm.cloudfront.net%2F__courses%2Fbcfa1456-e84f-4483-8cb6-f8cd98a728dc%2FCOURSE_IMAGE%2Fdocker-image-FLlCmt.png&w=640&q=75"
              alt="Course Image"
            />
          </div>

          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold text-primary">
              ₹{course.price.toFixed(2)}
            </span>
            <span className="text-xl line-through text-muted-foreground ml-2">
              ₹{course.price + 200}
            </span>
            <span className="text-sm font-semibold text-green-600 ml-2">
              {discountPercentage}% off
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{course.enrolledStudents} students</span>
                <span>{course.rating.toFixed(1)} rating</span>
              </div>
              <Progress value={course.rating * 20} className="h-2" />
            </div>

            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Secure payment
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Effective mentorship
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Gain practical knowledge
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <div  className="w-full flex justify-center">
                <Button variant="Blue">Schedule a meeting</Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule a meeting</DialogTitle>
                <DialogDescription>
                  After successful payment, you can communicate with your mentor
                  and schedule a meeting at your preferred time.
                </DialogDescription>
              </DialogHeader>

              <Select
                onValueChange={(value) =>
                  setPlan({
                    amount: plans[Number(value)].amount,
                    duration: plans[Number(value)].duration,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration of the meeting" />
                </SelectTrigger>
                <SelectContent className="bg-blue-500 text-white">
                  {plans.map((plan, index) => (
                    <SelectItem key={index} value={String(index)}>
                      {plan.duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DialogFooter>
                <Button onClick={handlePayment} variant={"Blue"} type="submit">
                  ₹{plan?.amount} / {plan?.duration}
                  <ArrowRight />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
