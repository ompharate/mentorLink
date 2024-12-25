"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import Button from "@/components/button/Button";
import { mentorValidationSchema } from "@/lib/yup";
import { mentorData } from "@/types/custom";
import { useSession } from "next-auth/react";
import { createMentor } from "@/lib/api";
import { useRouter } from "next/navigation";
import { submitData } from "@/lib/actions";

interface FormValues {
  title: string;
  description: string;
  hourlyRate: number | "";
  Category: string;
  keyPoints: string[];
  tags: string[];
  image?: File | null;
  userImage: string;
}
export const dynamic = 'force-dynamic'
export default function JobPostingForm() {
  const router = useRouter();
  const { data } = useSession();
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [keyPointsArray, setKeyPointsArray] = useState<string[]>([]);
  const [message, setMessage] = useState<String | null>(null);

  const [fileName, setFileName] = useState<string>("");

  const initialValues: FormValues = {
    title: "",
    description: "",
    hourlyRate: "",
    tags: [],
    keyPoints: [],
    userImage: "",
    Category: "",
    image: null,
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFieldValue("image", file);
      setFileName(file.name);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const formData: mentorData = {
      title: values.title,
      description: values.description,
      hourlyRate: Number(values.hourlyRate),
      Category: values.Category,
      image: " ",
      email: data?.user?.email,
      userId: data?.user?.id,
      userImage: data?.user?.image,
      name: data?.user?.name,
      tags: values.tags,
      keyPoints: values.keyPoints,
    };

  
    try {
      submitData(formData);
      setMessage("Form Submission Success");
    } catch (error) {
      setMessage("Form Submission Failed");
    }
  };

  return (
    <Card className="w-full max-w-[80%] my-5 mx-auto border-none shadow-none">
      <p>{message && message}</p>
      <CardHeader>
        <CardTitle className="text-3xl underline">Be a Mentor</CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={mentorValidationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, handleSubmit }) => (
            <Form className="grid grid-cols-2 gap-6  items-center">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Field
                  as={Input}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter the job title"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>

                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Describe the job requirements"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Field
                  as={Input}
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="Enter tags separated by commas"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const tagsArray = value.split(",");
                    setFieldValue("tags", tagsArray);
                    setTagsArray(tagsArray);
                  }}
                />
                <h1>
                  {tagsArray.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </h1>
                <ErrorMessage
                  name="tags"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">
                  What User Will learn in short points
                </Label>
                <Field
                  as={Input}
                  id="tags"
                  name="keyPoints"
                  type="text"
                  placeholder="Enter tags separated by commas"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const tagsArray = value.split(",");
                    setFieldValue("keyPoints", tagsArray);
                    setKeyPointsArray(tagsArray);
                  }}
                />
                <h1>
                  {keyPointsArray.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </h1>
                <ErrorMessage
                  name="tags"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Choose Image</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-primary/90"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {fileName || "No file chosen"}
                  </span>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Field
                  as={Input}
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="1"
                  placeholder="Enter hourly rate"
                />
                <ErrorMessage
                  name="hourlyRate"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="Category">Category</Label>
                <Field name="Category">
                  {({ field }: { field: any }) => (
                    <Select
                      onValueChange={(value) =>
                        setFieldValue("Category", value)
                      }
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select required Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-500 text-white">
                        <SelectItem value="react">CA</SelectItem>
                        <SelectItem value="vue">Teacher</SelectItem>
                        <SelectItem value="angular">Technology</SelectItem>
                        <SelectItem value="nodejs">Lawyer</SelectItem>
                        <SelectItem value="python">Doctor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="Category"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <Button variant="Blue" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
