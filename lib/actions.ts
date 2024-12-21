"use server";

import { mentorData } from "@/types/custom";
import { createMentor } from "./api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitData(formData: mentorData) {
  await createMentor(formData);
  revalidatePath("/mentors");
  redirect("/mentors");
}