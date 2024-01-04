import { API_URL } from "@/config";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Question({ id }) {
  const router = useRouter();
  const [question, setquestion] = useState([]);

  useEffect(() => {
    const token = getCookie("token");
      fetch(API_URL + "/question/" + id, {
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
          // Handle error - redirect or display an error message
        });
  }, [page]);
  

  return (
    <div className="container mt-5 text-center">
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
                See
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="container text-center m-auto">
        <button className="btn btn-primary btn-sm me-3" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span >{page}</span>
        <button className="btn btn-primary btn-sm ms-3" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
