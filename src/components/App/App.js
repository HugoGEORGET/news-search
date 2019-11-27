import React, { useEffect, useState } from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import ArticleResult from "../ArticleResult/ArticleResult";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [hasError, setErrors] = useState(false);
  const [newsResults, setNewsResults] = useState({});

  async function fetchNews(query) {
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
    fetchNews(query);
  }, [query]);

  return (
    <div className="App">
      <Navbar className="justify-content-between">
        <Navbar.Brand className="text-light">News search</Navbar.Brand>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search here..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Form>
      </Navbar>
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
    </div>
  );
}

export default App;
