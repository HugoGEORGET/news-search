import React, { useEffect, useState, useCallback } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import ArticleResult from "../ArticleResult/ArticleResult";
import Dropdown from "react-bootstrap/Dropdown";

function TopNews(props) {
  // Countries are hard-coded.
  // One way to programatically get those would be to use the News API /sources endpoint and parsing the result.abs
  // But I'm lazy 😪
  const countries = [
    "all",
    "ae",
    "ar",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "eg",
    "fr",
    "gb",
    "gr",
    "hk",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "it",
    "jp",
    "kr",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "ng",
    "nl",
    "no",
    "nz",
    "ph",
    "pl",
    "pt",
    "ro",
    "rs",
    "ru",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "th",
    "tr",
    "tw",
    "ua",
    "us",
    "ve",
    "za"
  ];

  const [country, setCountry] = useState("us");
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

  async function fetchTopNews(query, country, page) {
    const result = await fetch(
      "https://newsapi.org/v2/top-headlines?q=" +
        query +
        "&country=" +
        country +
        "&page=" +
        page +
        "&apiKey=803fdd9b8517490d89d8c85ade466b8d"
    );
    result
      .json()
      .then(result => setNewsResults(result))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchTopNews(props.query, country, page);
  }, [props.query, country, page]);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        {hasError ? (
          <span>Error : {JSON.stringify(hasError)}</span>
        ) : (
          newsResults.articles && (
            <>
              <h1 className="mb-3 d-flex">
                <span className="mr-3">Top news for </span>
                {
                  <DropdownButton
                    variant="outline-light"
                    title={country.toUpperCase()}
                    className="d-flex"
                  >
                    {countries.map((country, index) => (
                      <Dropdown.Item
                        eventKey={index}
                        onClick={() => setCountry(country)}
                      >
                        {country.toUpperCase()}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                }
                {props.query && (
                  <span className="ml-3">and query : {props.query}</span>
                )}
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

export default TopNews;
