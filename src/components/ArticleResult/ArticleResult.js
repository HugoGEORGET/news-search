import React from "react";

const ArticleResult = result => {
  return (
    <article className="news-article">
      <img src={result.urlToImage} alt="Article illustration"></img>
      <a href={result.url}>
        <h2>{result.title}</h2>
      </a>
      <p>{result.description}</p>
    </article>
  );
};

export default ArticleResult;
