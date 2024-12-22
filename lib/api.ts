import { mentorData } from "@/types/custom";
import {
  ALLOCATE_MENTOR,
  CREATE_MENTOR,
  CREATE_ORDER,
  FETCH_CHAT,
  FETCH_MENTOR,
  FETCH_MENTOR_ID,
  FETCH_MENTORS,
  FETCH_MY_MENTORS,
  FETCH_MY_USERS,
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

export const fetchMentors = async (query: {
  maxrate?: string;
  category?: string;
  search?: string;
}) => {
  try {
    const response = await fetch(`${FETCH_MENTORS(query)}`, {
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

export const fetchMentorId = async (id: string) => {
  try {
    const response = await fetch(`${FETCH_MENTOR_ID(id)}`, {
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

export const createOrder = async (amount: { amount: number }) => {

  try {
    const response = await fetch(`${CREATE_ORDER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "INR",
        amount: amount.amount,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error creating order");
  }
};

export const allocateMentor = async ({
  userId,
  mentorId,
}: {
  userId: string;
  mentorId: string;
}) => {

  try {
    const response = await fetch(`${ALLOCATE_MENTOR}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        mentorId,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error("Could not find user");
    }
  } catch (error) {
    throw new Error("Error creating order");
  }
};

export const fetchMyMentors = async (userId: string) => {
  try {
    const response = await fetch(`${FETCH_MY_MENTORS(userId)}`, {
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

export async function fetchMyUsers(userId: string) {
  try {
    const response = await fetch(`${FETCH_MY_USERS(userId)}`, {
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
}

export async function fetchChat(userId: string) {
  try {
    const response = await fetch(`${FETCH_CHAT(userId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      cache: "no-store",
    });
 
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching chat");
  }
}
