import React, { useState, useEffect } from "react";

const News = () => {
  const [hasError, setErrors] = useState(false);
  const [newsResults, setNewsResults] = useState({});

  async function fetchNews() {
    const result = await fetch("https://newsapi.org/v2/everything?q=test&sortBy=popularity&apiKey=");
    result
      .json()
      .then(result => setNewsResults(result))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <span>Error : {JSON.stringify(hasError)}</span>
      <hr />
      <span>{JSON.stringify(newsResults)}</span>
    </>
  );
};

export default News;
