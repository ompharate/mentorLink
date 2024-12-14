import { mentorData } from "@/types/custom";
import {
  CREATE_MENTOR,
  FETCH_MENTOR,
  FETCH_MENTORS,
  IS_USER_MENTOR,
} from "./apiAuthRoutes";

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
    const response = await fetch(`${IS_USER_MENTOR(userId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-store",
    });
    const result = await response.json();
    return result.isMentor;
  } catch (error) {
    throw new Error("Error checking if user is mentor");
  }
};

export const fetchMentor = async (userId: String) => {
  try {
    const response = await fetch(`${FETCH_MENTOR(userId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching user mentor");
  }
};

export const fetchMentors = async () => {
  try {
    const response = await fetch(`${FETCH_MENTORS}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching mentors");
  }
};