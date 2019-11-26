import React, { useState, useEffect } from "react";
import ArticleResult from "../ArticleResult/ArticleResult";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [hasError, setErrors] = useState(false);
  const [newsResults, setNewsResults] = useState({});

  useEffect(() => {
    async function fetchNews() {
      const result = await fetch(
        "https://newsapi.org/v2/everything?q=" +
          query +
          "&sortBy=popularity&apiKey=803fdd9b8517490d89d8c85ade466b8d"
      );
      result
        .json()
        .then(result => setNewsResults(result))
        .catch(err => setErrors(err));
    }
    fetchNews();
  }, [query]);

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(query);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
        />
      </form>
      {hasError ? (
        <span>Error : {JSON.stringify(hasError)}</span>
      ) : (
        newsResults.articles && (
          <>
            {newsResults.articles.map(article => (
              <ArticleResult article={article} />
            ))}
          </>
        )
      )}
    </div>
  );
}

export default App;
