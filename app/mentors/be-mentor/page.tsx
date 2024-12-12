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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bold, Italic, Upload } from "lucide-react";
import Button from "@/components/button/Button";
import { mentorValidationSchema } from "@/lib/yup";
import { mentorData } from "@/types/custom";
import { useSession } from "next-auth/react";
import { createMentor } from "@/lib/api";

interface FormValues {
  title: string;
  description: string;
  hourlyRate: number | "";
  skills: string;
  image?: File | null;
}
export default function JobPostingForm() {
  const { data } = useSession();
  const [message, setMessage] = useState<String | null>(null);
  const [descriptionFormat, setDescriptionFormat] = useState({
    bold: false,
    italic: false,
  });
  const [fileName, setFileName] = useState<string>("");

  const initialValues: FormValues = {
    title: "",
    description: "",
    hourlyRate: "",
    skills: "",
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
      skills: values.skills,
      image: " ",
      email: data?.user?.email,
      userId: data?.user?.id,
      name: data?.user?.name,
    };

    try {
      await createMentor(formData);
      setMessage("Form Submission Success");
    } catch (error) {
      setMessage("Form Submission Failed");
    }
  };

  return (
    <Card className="w-full max-w-7xl my-5 mx-auto border-none shadow-none">
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
              {/* Title */}
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
                <div className="flex gap-2 mb-2">
                  <Button
                    variant="Blue"
                    onClick={() =>
                      setDescriptionFormat((prev) => ({
                        ...prev,
                        bold: !prev.bold,
                      }))
                    }
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="Red"
                    onClick={() =>
                      setDescriptionFormat((prev) => ({
                        ...prev,
                        italic: !prev.italic,
                      }))
                    }
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                </div>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Describe the job requirements"
                  className={`${descriptionFormat.bold ? "font-bold" : ""} ${
                    descriptionFormat.italic ? "italic" : ""
                  }`}
                />
                <ErrorMessage
                  name="description"
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
                <Label htmlFor="skills">Skills</Label>
                <Field name="skills">
                  {({ field }: { field: any }) => (
                    <Select
                      onValueChange={(value) => setFieldValue("skills", value)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select required skills" />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-500 text-white">
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="nodejs">Node.js</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="skills"
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
