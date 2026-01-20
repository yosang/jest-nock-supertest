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
