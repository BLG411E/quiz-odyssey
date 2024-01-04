import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import profileicon from './profileicon2.png';

export default function Home() {
  const router = useRouter();
  const [displayedRoute, setDisplayedRoute] = useState(null);
  

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleButtonClick = (route) => {
    setDisplayedRoute(route);
    router.push(route); // This line pushes the route to change the URL
  };

  console.log(profileicon);

  return (
    <div className="container">
      <div className="sidebar">
      <div className="user-info">
        <img src={profileicon} alt="Profile Icon" className="profile-icon" />
        <span className="username">Username</span>
      </div>
        <button
          onClick={() => {
            handleButtonClick("/dashboard/users");
          }}
          className="btn btn-success"
        >
          Users
        </button>
        <button
          onClick={() => {
            handleButtonClick("/dashboard/questions");
          }}
          className="btn btn-success"
        >
          Questions
        </button>
        <button
          onClick={() => {
            deleteCookie("token");
            router.push("/login");
          }}
          className="btn btn-danger logout"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
