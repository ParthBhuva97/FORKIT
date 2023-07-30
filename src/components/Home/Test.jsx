import React, { useEffect } from "react";
import axios from "axios";

const Test = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const installation_id = queryParameters.get("installation_id");

  function getData() {
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    const apiUrl = "https://api.github.com/user/repos";

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer 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`,
      "X-GitHub-Api-Version": "2022-11-28", // Replace with the desired GitHub API version
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        const repositories = response.data;
        console.log("Repositories:", repositories);
        // Process the repositories data as needed
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        // Handle the error
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/data?installation_id=${installation_id}`)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
      });
  }, []);
  return (
    <div>
      This is test.
      <button
        onClick={() => {
          getData();
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Test;
