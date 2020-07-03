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
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const result = await fetch(
      `${proxyUrl}https://newsapi.org/v2/everything?q=${query}&page=${page}`,
      {
        headers: {
          "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY,
        },
      }
    );
    result
      .json()
      .then((result) => {
        setNewsResults(result);
      })
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    if (props.query) {
      fetchAllNews(props.query, page);
    }
  }, [props.query, page]);

  if (!newsResults && !hasError) {
    return <Spinner animation="grow" />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {hasError ? (
          <span>Error : {JSON.stringify(hasError)}</span>
        ) : newsResults.articles ? (
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
        ) : (
          <h1>Use the search bar to find news !</h1>
        )}
      </Row>
    </Container>
  );
}

export default NewsSearch;
