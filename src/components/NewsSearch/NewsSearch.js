import React, { useEffect, useState } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ArticleResult from "../ArticleResult/ArticleResult";

function NewsSearch(props) {
  const [hasError, setErrors] = useState(false);
  const [newsResults, setNewsResults] = useState({});

  async function fetchEverything(query) {
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

  useEffect(() => {
    fetchEverything(props.query);
  }, [props.query]);

  return (
    <Container fluid>
      <Row>
        {hasError ? (
          <span>Error : {JSON.stringify(hasError)}</span>
        ) : (
          newsResults.articles && (
            <CardDeck>
              {newsResults.articles.map((article, index) => (
                <ArticleResult article={article} key={index} />
              ))}
            </CardDeck>
          )
        )}
      </Row>
    </Container>
  );
}

export default NewsSearch;
