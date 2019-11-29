import React, { useCallback, useEffect, useState } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import ArticleResult from "../ArticleResult/ArticleResult";

function NewsSearch(props) {
  const [page, setPage] = useState(1);
  const [hasError, setErrors] = useState(false);
  const [newsResults, setNewsResults] = useState({});

  const nextPage = useCallback(() => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  }, [page]);

  const previousPage = useCallback(() => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  }, [page]);

  async function fetchAllNews(query, page) {
    const result = await fetch(
      "https://newsapi.org/v2/everything?q=" +
        query +
        "&page=" +
        page +
        "&apiKey=803fdd9b8517490d89d8c85ade466b8d"
    );
    result
      .json()
      .then(result => {
        setNewsResults(result);
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchAllNews(props.query, page);
  }, [props.query, page]);

  if (!newsResults && !hasError) {
    return <Spinner animation="grow" />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {hasError ? (
          <span>Error : {JSON.stringify(hasError)}</span>
        ) : (
          newsResults.articles && (
            <>
              <h1 className="mb-3">
                Freshest news for your query : {props.query}
              </h1>
              <CardDeck>
                {newsResults.articles.map((article, index) => (
                  <ArticleResult article={article} key={index} />
                ))}
              </CardDeck>
              <Pagination>
                {page > 1 && <Pagination.Prev onClick={previousPage} />}
                <Pagination.Item disabled>Page {page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </>
          )
        )}
      </Row>
    </Container>
  );
}

export default NewsSearch;
