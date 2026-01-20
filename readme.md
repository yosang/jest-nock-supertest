# Jest + Supertest + Nock Demo

Simple demonstration of `Jest` being used with `Nock` and `Supertest` for integration test in a NodeJS + Express application.

## Purpose

This little porject shows how to write integration tests for API endspoints that depend on external services, without making real HTTP calls during tests.

Through this we can ensure:

- That API routes work end-to-end.
- Error handling and edge cases are covered.
- External API changes don't silently break our app.

## Tools

- **Nock** - An HTTP request mocking library that intercepts outgoing HTTP requests (external API calls) and allows testing with specific predefined responses.
- **Supertest** - A lightweight library for testing HTTP endpoints without having to run the Express app.
- **Jest** - Powerful test runner and framework for `NodeJS` that provides a wide range of assertions, test organization and mocking utilities.

## Composition

- Has one endpoint `/jokes` that fetched random jokes from and external API, the link to the API used it [here](https://jokeapi.dev/).
- Uses Nock to mock the external API response.
- Uses Supertest to simulate a GET request to the Express app.
- Asserts the status code and response body of the response.
