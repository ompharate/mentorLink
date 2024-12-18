import * as Yup from "yup";
export const mentorValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  hourlyRate: Yup.number()
    .min(1, "Hourly rate must be greater than 0")
    .required("Hourly rate is required"),
    Category: Yup.string().required("At least one Category is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});