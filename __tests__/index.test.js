const app = require("../index.js");
const request = require("supertest")(app);
const nock = require("nock");

test("GET /jokes returns 3 mocked jokes", async () => {
  // Arrange
  const mockedData = [
    {
      category: "Pun",
      setup: "What kind of doctor is Dr. Pepper?",
      delivery: "He's a fizzician.",
    },
    {
      category: "Christmas",
      setup: "Whats the Grinchs least favorite band?",
      delivery: "The Who.",
    },
    {
      category: "Misc",
      setup: "Why is every gender equality officer female?",
      delivery: "Because it's cheaper.",
    },
  ];
  // Mock the API call inside the /jokes endpoint
  nock("https://v2.jokeapi.dev")
    .get("/joke/Any")
    .query({ amount: 3 })
    .reply(200, mockedData);

  // Act
  const response = await request.get("/jokes");

  // Assert
  expect(response.status).toBe(200);
  expect(response.body).toEqual(mockedData);
});

test("GET /jokes error handling", async () => {
  // Arrange
  const statusCode = 500;
  const errorMessage = "Unable to fetch data";

  nock("https://v2.jokeapi.dev")
    .get("/joke/Any")
    .query({ amount: 3 })
    .replyWithError("Service unavailable"); // Triggers an error from the fetch side, which enables the error handling

  // Act
  const { status, body } = await request.get("/jokes");

  // Assert
  expect(status).toBe(500);
  expect(body.error).toBe("Unable to fetch data");
});
