// AdminRoute.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";

export default function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = auth?.token || JSON.parse(localStorage.getItem("auth"))?.token;
        const res = await axios.get("https://backend-production-8ea6.up.railway.app/api/auth/admin-auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        setOk(false);
      }
    };

    if (auth?.token) checkAdmin();
  }, [auth?.token]);

  return ok ? <>{children}</> : <Spinner />;
}
