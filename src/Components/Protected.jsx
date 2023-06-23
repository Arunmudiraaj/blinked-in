import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
const Protected = (props) => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    if (!loading && initialLoading) {
      setInitialLoading(false);

      if (!user) {
        navigate("/login");
      }
    }
  }, [user, loading, navigate, initialLoading]);

  if (initialLoading) {
    return null; // Render nothing during initial loading
  }

  if (!user) {
    return null; // Render nothing if not authenticated
  }
  return <Outlet />;
};

export default Protected;
