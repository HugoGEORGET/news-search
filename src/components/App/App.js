import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import NewsSearch from "../NewsSearch/NewsSearch";
import TopNews from "../TopNews/TopNews";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");

  return (
    <Router>
      <div className="App">
        <Navbar className="justify-content-between">
          <Navbar.Brand className="text-light">News search</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-navigation" />
          <Navbar.Collapse id="navbar-navigation">
            <Nav>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/top-news">Top news</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline className="w-25">
            <FormControl
              type="text"
              className="w-100"
              placeholder="Search here..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </Form>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <NewsSearch query={query} />
          </Route>
          <Route path="/top-news">
            <TopNews query={query} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
