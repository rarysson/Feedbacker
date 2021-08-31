import axios from "axios";
import AuthService from "./auth/authService";
import UsersService from "./auth/usersService";
import FeedbacksService from "./auth/feedbacksService";
import router from "../router";
import { setGlobalLoading } from "../store/global";

const API_ENVS = {
  local: "http://localhost:3000",
};

const httpCliente = axios.create({
  baseURL: API_ENVS.local,
});

httpCliente.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("token");

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpCliente.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    return response;
  },
  (error) => {
    const canThrowError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }

    if (error.response.status === 401) {
      router.push({ name: "Home" });
      window.localStorage.setItem("token", "");
    }

    setGlobalLoading(false);

    return error;
  }
);

export default {
  auth: AuthService(httpCliente),
  users: UsersService(httpCliente),
  feedbacks: FeedbacksService(httpCliente),
};
