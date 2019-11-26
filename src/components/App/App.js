import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [hasError, setErrors] = useState(false);
  const [newsResults, setNewsResults] = useState({});

  async function fetchNews() {
    const result = await fetch(
      "https://newsapi.org/v2/everything?q=test&sortBy=popularity&apiKey=803fdd9b8517490d89d8c85ade466b8d"
    );
    result
      .json()
      .then(result => setNewsResults(result))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    alert("submitting query : " + query);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
        />
        <input type="submit" value="Submit" />
      </form>
      {hasError ? (
        <span>Error : {JSON.stringify(hasError)}</span>
      ) : (
        <span>{JSON.stringify(newsResults)}</span>
      )}
    </div>
  );
}

export default App;
