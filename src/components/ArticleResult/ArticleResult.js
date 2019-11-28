import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const ArticleResult = ({ article }) => {
  const articleDate = new Date(article.publishedAt);
  const [hidden, setHidden] = useState(false);
  const hideArticle = useCallback(() => {
    setHidden(true);
  }, []);

  return (
    <Col sm={12} md={4} className={"mb-4 " + (hidden ? "d-none" : "")}>
      <Card className="h-100">
        <Card.Img variant="top" src={article.urlToImage} />
        <Card.Body>
          <Card.Title>
            <a href={article.url}>{article.title}</a>
          </Card.Title>
          <Card.Text className="text-body">{article.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex align-items-center justify-content-between">
          <small className="text-muted">{articleDate.toDateString()}</small>
          <Button variant="outline-secondary" onClick={hideArticle}>
            Hide Article
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ArticleResult;
