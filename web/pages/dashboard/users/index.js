import { API_URL } from "@/config";
import { getCookie, getCookies, setCookies } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profileicon from '../profileicon2.png';


export default function Users() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [displayedRoute, setDisplayedRoute] = useState(null);


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

      fetch(API_URL + "/users/listmoderators", {
        headers: {
          Token: token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setModerators(json.results);
        });
    }
  }, []);

  const deleteUser = async (id) => {
    const token = getCookie("token");
    const response = await fetch(API_URL + "/users/" + id, {
      method: "DELETE",
      headers: {
        Token: token,
      },
    });
    if (response.status === 200) {
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
    } else {
      alert("Failed to delete user");
    }
  }

  const upgradeUser = async (username) => {
    const token = getCookie("token");
    const response = await fetch (API_URL + `/users/upgradeuser/${username}`, {
      method: "POST",
      headers: {
        Token: token,
      },
    });
    if (response.status === 200) {
      console.log("Upgraded successfully!");
      setModerators([...moderators, {username}]);

    }else {
      alert("Not upgraded");
    }
  }

  const downgradeUser = async (username) => {
    const token = getCookie("token");
    const response = await fetch (API_URL + `/users/downgrade/${username}`, {
      method: "DELETE",
      headers: {
        Token: token,
      },
    });
    if (response.status === 200) {
      console.log("Downgraded successfully!");
      setModerators(moderators.filter((moderator) => moderator.username !== username));
    }else {
      alert("Not downgraded");
    }
  }

  const handleButtonClick = (route) => {
    setDisplayedRoute(route);
    router.push(route); 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
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

        <div className="col-">
          <div className="container mt-3 text-center">
            <div className="mt-3">
              <h3>Moderators</h3>
                <div className="row">
                  {moderators.map((user, i) => (
                    <div key={i} className="row">
                      <div className="moderator-icon">
                        <img src={profileicon} alt="Profile Icon"/>
                      </div>
                      <div className="row">
                        <input
                          className="form-control-plaintext"
                          value={user.username}
                          readOnly
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row">
                  {moderators.map((user, i) => (
                    <div key={i} className="row">
                      <div className="col-2">
                        <input
                          className="form-control-plaintext"
                          value={user.id}
                          readOnly
                        />
                      </div>
                      <div className="col-3">
                        <input
                          className="form-control-plaintext"
                          value={user.username}
                          readOnly
                        />
                      </div>
                      <div className="col-3">
                        <input
                          className="form-control-plaintext"
                          value={user.email}
                          readOnly
                        />
                      </div>
                      <div className="col-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            downgradeUser(user.username);
                          }}
                        >
                          Downgrade
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            
            <div className="mt-3">
              <h3>Users</h3>

              {users.map((user, i) => (
                <div key={i} className="row">
                  <div className="col-2">
                    <input
                      className="form-control-plaintext"
                      value={user.id}
                      readOnly
                    />
                  </div>
                  <div className="col-3">
                    <input
                      className="form-control-plaintext"
                      value={user.username}
                      readOnly
                    />
                  </div>
                  <div className="col-3">
                    <input
                      className="form-control-plaintext"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (moderators.filter((moderator) => moderator.username === user.username).length > 0) {
                          downgradeUser(user.username);
                        } else
                          upgradeUser(user.username);
                      }
                    }
                    >
                      {moderators.filter((moderator) => moderator.username === user.username).length > 0 ? "Downgrade" : "Upgrade"}
                    </button>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          
          </div>
        </div>
      </div>

    </div>
);
  

}