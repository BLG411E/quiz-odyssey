import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="">
      <h1>Hello, world!</h1>
      <button onClick={() => {
          router.push("/dashboard/users");
      }} className="btn btn-success">Users</button>
      <button onClick={() => {
          deleteCookie("token");
          router.push("/login");
      }} className="btn btn-danger">Log out</button>
      </div>

  )
}
