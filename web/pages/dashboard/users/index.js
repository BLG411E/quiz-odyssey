import { API_URL } from "@/config";
import { getCookie, getCookies, setCookies } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
    } else {
      fetch(API_URL + "/users/list", {
        headers: {
          Token: token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setUsers(json.results);
        });
    }
  }, []);

  return (
    <div className="container mt-5 text-center">
      <div className="mt-3">
        <h3>Users</h3>
        {users.map((user, i) => (
          <div key={i} className="row">
            <div className="col-2">
              <input
                className="form-control-plaintext"
                value={user.id}
                readOnly
              ></input>
            </div>
            <div className="col-3">
              <input
                className="form-control-plaintext"
                value={user.username}
                readOnly
              ></input>
            </div>
            <div className="col-3">
              <input
                className="form-control-plaintext"
                value={user.email}
                readOnly
              ></input>
            </div>
            <div className="col-4">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  router.push(`/dashboard/users/${user.id}`);
                }}
              >
                See
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}