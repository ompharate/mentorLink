import * as Yup from "yup";
export const mentorValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  hourlyRate: Yup.number()
    .min(1, "Hourly rate must be greater than 0")
    .required("Hourly rate is required"),
  Category: Yup.string().required("At least one Category is required"),
  tags: Yup.array()
    .of(Yup.string().required("Each tag must be a string"))
    .min(1, "At least one tag is required")
    .required("Tags are required"),
    keyPoints: Yup.array()
    .of(Yup.string().required("Each Key point must be a string"))
    .min(1, "At least one Key Point is required")
    .required("Key Points are required"),

});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
