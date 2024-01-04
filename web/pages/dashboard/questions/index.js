import { API_URL } from "@/config";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profileicon from '../profileicon2.png';

export default function Questions() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedRoute, setDisplayedRoute] = useState(null);


  useEffect(() => {
    const token = getCookie("token");
      fetch(API_URL + "/question/listall?page=" + page, {
        headers: {
          Token: token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch questions");
          }
          return res.json();
        })
        .then((json) => {
          setQuestions(json.results);
          setTotalPages(Math.ceil(json.total / json.per_page));
          console.log(json.results);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [page]);
  
  const handleButtonClick = (route) => {
    setDisplayedRoute(route);
    router.push(route); 
  };

  const deleteQuestion = async (id) => {
    const token = getCookie("token");
    const response = await fetch(API_URL + "/question/" + id, {
      method: "DELETE",
      headers: {
        Token: token,
      },
    });
    if (response.status === 200) {
      const newQuestions = questions.filter((question) => question.id !== id);
      setQuestions(newQuestions);
    } else {
      alert("Failed to delete question");
    }
  }

  return (
    <div className="container mt-5 text-center">
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

        <div className="container mt-6 text-center">
            <div className="mt-3">
                <h3>Questions</h3>
                {questions.map((question, i) => (
                <div key={i} className="row">
                    <div className="col-2">
                        <input
                            className="form-control-plaintext"
                            value={question.id}
                            readOnly
                        ></input>
                    </div>
                    <div className="col-8">
                    <input
                        className="form-control-plaintext"
                        value={question.text}
                        readOnly
                    ></input>
                    </div>
                    <div className="col-2">
                      <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                          router.push(`/questions/${question.id}`);
                          }}
                      >
                          Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteQuestion(question.id);
                        }}
                      >
                        Delete
                      </button>

                    </div>
                </div>
                ))}
            </div>
            <div className="container text-center d-flex justify-content-center align-items-center">
                <button className="btn btn-secondary btn-sm custom-btn" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <span >{page}</span>
                <button className="btn btn-secondary btn-sm custom-btn" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>

    </div>
    
  );
}
