"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/stores/store";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const useGetSessions = () => {
  // const [token, setToken] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);

  // useEffect(() => {
  //   const userToken = localStorage.getItem("token");
  //   if (userToken) {
  //     setToken(userToken);
  //   }
  // }, []);
  // const token = localStorage.getItem('token');

  // console.log(token);
  const getSessions = async () => {
    const resp = await axios.get("/sessions/allSessions?page=1&limit=10", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (resp.status !== 200 && resp.status !== 201) {
      throw new Error("Failed to get sessions");
    }
    console.log(resp.data);
    return resp.data;
  };

  const query = useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
    enabled: !!token, // only run when token is available
  });

  return query;
};
