import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import NewsSearch from "./NewsSearch";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders multiple articles in news search", async () => {
  // No pun intended...
  const fakeNews = {
    status: "ok",
    totalResults: 32,
    articles: [
      {
        source: {
          id: null,
          name: "name"
        },
        author: "",
        title: "Title",
        description: "Description",
        url: "https://www.google.com",
        urlToImage: null,
        publishedAt: "2019-11-28T15:45:00Z",
        content: "C O N T E N T"
      },
      {
        source: {
          id: null,
          name: "sourceName"
        },
        author: "",
        title: "Title 2",
        description: "Description of an article",
        url: "https://www.qwant.com",
        urlToImage: null,
        publishedAt: "2019-11-30T15:45:00Z",
        content: "la li lu le lo"
      }
    ]
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeNews)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<NewsSearch />, container);
  });

  expect(container.textContent).toContain(fakeNews.articles[0].title);
  expect(container.textContent).toContain(fakeNews.articles[0].description);
  expect(container.textContent).toContain(fakeNews.articles[1].title);
  expect(container.textContent).toContain(fakeNews.articles[1].description);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
