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
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowRightCircle } from "lucide-react";

interface Course {
  title: string;
  price: number;
  originalPrice: number;
  enrolledStudents: number;
  rating: number;
}

export function FloatingCard({ course }: { course: Course }) {
  const [isSticky, setIsSticky] = useState(false);

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

  const discountPercentage = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isSticky ? "sticky top-4" : ""
      }`}
    >
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="aspect-video bg-muted mb-4 rounded-lg">
            <img src="https://learn.piyushgarg.dev/_next/image?url=https%3A%2F%2Fdcaj3bhl5hivm.cloudfront.net%2F__courses%2Fbcfa1456-e84f-4483-8cb6-f8cd98a728dc%2FCOURSE_IMAGE%2Fdocker-image-FLlCmt.png&w=640&q=75" />
          </div>

          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold text-primary">
              ₹{course.price.toFixed(2)}
            </span>
            <span className="text-xl line-through text-muted-foreground ml-2">
              ${course.originalPrice.toFixed(2)}
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
                Lifetime access
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
                Certificate of completion
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
                30-day money-back guarantee
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Schedule a meeting</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule a meeting</DialogTitle>
                <DialogDescription>
                  after successful payment you can communicate with your mentor
                  and have meeting in your preferred timing
                </DialogDescription>
              </DialogHeader>

              <Select
              // onValueChange={(value) => setFieldValue("Category", value)}
              // defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration of the meeting" />
                </SelectTrigger>
                <SelectContent className="bg-blue-500 text-white">
                  <SelectItem value="30Min">30Min</SelectItem>
                  <SelectItem value="1Hr">1Hr</SelectItem>
                  <SelectItem value="2Hr">2Hr</SelectItem>
                  <SelectItem value="3Hr">3Hr</SelectItem>
                  <SelectItem value="4Hr">4Hr</SelectItem>
                </SelectContent>
              </Select>

              <DialogFooter>
                <Button variant={"outline"} type="submit">₹999<ArrowRight/></Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
