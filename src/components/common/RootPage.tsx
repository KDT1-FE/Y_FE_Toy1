import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "@/firebase/firebase";

export default function RootPage() {
  const Root = () => {
    const location = useLocation();
    useEffect(() => {
      const interval = setInterval(() => {
        auth.onAuthStateChanged((user) => {
          if (location.pathname !== "/login" && user == null) {
            setTimeout(() => window.location.replace("/login"), 800);
          }
        });
      });
      return () => {
        clearInterval(interval);
      };
    }, []);
  };

  Root();

  return <></>;
}
