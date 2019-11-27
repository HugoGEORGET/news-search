import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const ArticleResult = ({ article }) => {
  const articleDate = new Date(article.publishedAt);

  return (
    <Col sm={12} md={4}>
      <Card className="h-100">
        <Card.Img variant="top" src={article.urlToImage} />
        <Card.Body>
          <Card.Title>
            <a href={article.url}>{article.title}</a>
          </Card.Title>
          <Card.Text className="text-body">{article.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{articleDate.toDateString()}</small>
        </Card.Footer>
      </Card>
    </Col>
    /* <article className="news-article">
      <img src={article.urlToImage} alt="Article illustration"></img>
      <a href={article.url}>
        <h2>{article.title}</h2>
      </a>
      <p>{article.description}</p>
    </article> */
  );
};

export default ArticleResult;
