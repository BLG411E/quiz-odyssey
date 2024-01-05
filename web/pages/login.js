import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_URL } from "@/config";

export default function Login() {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  return (
    <div className="container mt-5 text-center">
        <div class="form-group">
        <label htmlFor="emailInput">Email</label>
        <input
          type="text"
          className="form-control"
          id="emailInput"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="form-group">
        <label htmlFor="passwordInput">Password</label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <button
        type="button"
        onClick={async () => {
          if (pass) {
            const response = await fetch(API_URL + "/auth/stafflogin", {
              method: "POST",
              body: JSON.stringify({ username: email,  password: pass }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            if (response.status == 200) {
              const json = await response.json();
              setCookie("token", json.token);
              router.push("/dashboard");
            } else {
              alert("Invalid credentials");
            }
          }
        }}
        className="btn btn-primary mt-2 w-100"
      >
        Login
      </button>
    </div>
  );
}