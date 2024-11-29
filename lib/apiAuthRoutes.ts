import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const GOOGLE_LOGIN_URL = API_URL + "/auth/google";
export const EMAIL_LOGIN_URL = API_URL + "/auth/signin";
export const EMAIL_SIGNUP_URL = API_URL + "/auth/signup";

// export const CHAT_GROUP = API_URL + "/chat-group";
// export const CHAT_GROUP_USERS = API_URL + "/chat-group-user";
// export const CHATS_URL = API_URL + "/chats";