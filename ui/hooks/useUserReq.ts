import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type userData = {
  name: string;
  email: string;
  password: string;
};

type loginData = {
  email: string;
  password: string;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const useCreateUser = () => {
  const createUserReq = async (data: userData) => {
    const resp = await axios.post("/auth/signup", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status >= 400) {
      throw new Error(resp.data?.message || "Failed to create user");
    }

    return await resp.data;
  };

  const {
    mutate: createUser,
    mutateAsync: createUserAsync,
    isError,
    isSuccess,
    error,
    isPending,
  } = useMutation({ mutationFn: createUserReq });

  return {
    createUser, // fire-and-forget
    createUserAsync, // awaitable
    isError,
    isSuccess,
    error,
    isPending,
  };
};

export const useLoginUser = () => {
  const loginUserReq = async (data: loginData) => {
    const resp = await axios.post("/auth/login", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.status >= 400) {
      throw new Error(resp.data?.message || "Failed to create user");
    }

    return await resp.data;
  };
  const {
    mutate: loginUser,
    mutateAsync: loginUserAsync,
    isError,
    isSuccess,
    error,
    isPending,
  } = useMutation({ mutationFn: loginUserReq });

  return {
    loginUser, // fire-and-forget
    loginUserAsync, // awaitable
    isError,
    isSuccess,
    error,
    isPending,
  };
};
