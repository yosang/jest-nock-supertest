require("dotenv").config();
const app = require("express")();

app.get("/jokes", async (_, res) => {
  try {
    const response = await fetch(process.env.JOKES_API_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, error: "Unable to fetch data" });
  }
});

module.exports = app;
