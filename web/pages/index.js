import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, []);
  return (
    <div>
      </div>
  )
}
