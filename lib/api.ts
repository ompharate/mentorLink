import { mentorData } from "@/types/custom";
import { CREATE_MENTOR, IS_user_mentor } from "./apiAuthRoutes";

export const createMentor = async (data: mentorData) => {
  try {
    const response = await fetch(`${CREATE_MENTOR}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    throw new Error("Error creating mentor");
  }
};

export const isUserMentor = async (userId: String) => {
  try {
    const response = await fetch(`${IS_user_mentor}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-store",
    });
    const result = await response.json();
    return result.response.isMentor;
  } catch (error) {
    throw new Error("Error checking if user is mentor");
  }
};
