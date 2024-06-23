import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../AuthContext";

const ProctedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [authContextIsLoading, setAuthContextIsLoading] = useState(
    auth.access_token === ""
  );

  useEffect(() => {
    if (
      (!authContextIsLoading && !sessionStorage.getItem("access_token")) ||
      !sessionStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token")!.length < 10
    ) {
      toast.error("로그인을 하고 접속하십시오");
      navigate("/");
    }
  }, [authContextIsLoading, navigate]);

  useEffect(() => {
    if (authContextIsLoading) setAuthContextIsLoading(auth.access_token === "");
  }, [authContextIsLoading, auth.access_token]);

  return authContextIsLoading ? null : children;
};

export default ProctedRoute;
