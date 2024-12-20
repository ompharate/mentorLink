import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const GOOGLE_LOGIN_URL = API_URL + "/auth/google";
export const EMAIL_LOGIN_URL = API_URL + "/auth/signin";
export const EMAIL_SIGNUP_URL = API_URL + "/auth/signup";

export const CREATE_MENTOR = API_URL + "/create-mentor";
export const IS_USER_MENTOR = (userId: String) => `${API_URL}/user/${userId}`;
export const FETCH_MENTOR = (userId: String) => `${API_URL}/mentor/${userId}`;
export const FETCH_MENTORS = (query: {
  maxrate?: string;
  category?: string;
  search?: string;
}) => `${API_URL}/mentors?${new URLSearchParams(query).toString()}`;

export const FETCH_MENTOR_ID = (id: string) => `${API_URL}/mentor?id=${id}`;
export const CREATE_ORDER = `${API_URL}/payment/create-order`;
export const ALLOCATE_MENTOR = `${API_URL}/user/allocate-mentor`;
// export const CHAT_GROUP_USERS = API_URL + "/chat-group-user";
// export const CHATS_URL = API_URL + "/chats";
