import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      // If there's no token in the context or localStorage, redirect immediately
      const token = auth?.token || JSON.parse(localStorage.getItem("auth"))?.token;

      if (!token) {
        console.warn("⚠️ No token found");
        setOk(false);
        return;
      }

      console.log("Token being sent:", token);

      try {
        const response = await axios.get("https://backendfyp-production.up.railway.app/api/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ Auth success:", response.data);
        setOk(true); // If auth is successful, update state to render the protected content
      } catch (error) {
        if (error.response) {
          console.error("❌ 401 Unauthorized:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
        setOk(false); // If there's an error (unauthorized), update state
      }
    };

    authCheck(); // Trigger auth check

  }, [auth?.token]); // Re-run whenever the auth context token changes

  // Render spinner while loading or redirect if not authorized
  if (!ok) {
    return <Spinner path="" />;
  }

  return <Outlet />;
}
