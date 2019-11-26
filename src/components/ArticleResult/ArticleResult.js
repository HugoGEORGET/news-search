import React from "react";

const ArticleResult = ({ article }) => {
  return (
    <article className="news-article">
      <img src={article.urlToImage} alt="Article illustration"></img>
      <a href={article.url}>
        <h2>{article.title}</h2>
      </a>
      <p>{article.description}</p>
    </article>
  );
};

export default ArticleResult;
