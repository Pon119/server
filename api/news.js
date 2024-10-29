const express = require("express");
const news = express.Router();
const axios = require("axios");

news.get("/", async function (req, res) {
  const api = await axios.get(
    "https://api-v2.deepsearch.com/v1/global-articles?date_from=2024-10-23&date_to=2024-10-24&api_key=30c89185a6464a2190e6d40349de39e0"
  );
  res.json(api.data);
});

// 각 카테고리별(정치, 사회 등등의 데이터값을 요청할 때 쓰는 것)
news.get("/category", async function (req, res) {
  const { category } = req.query;
  const api = await axios.get(
    `https://api-v2.deepsearch.com/v1/global-articles/${category}?date_from=2024-10-23&date_to=2024-10-24&api_key=30c89185a6464a2190e6d40349de39e0`
  );
  res.json(api.data);
});

// 국내 서버 요청 (기본)
news.get("/ko", async function (req, res) {
  const api = await axios.get(
    "https://api-v2.deepsearch.com/v1/articles?date_from=2024-10-23&date_to=2024-10-24&api_key=30c89185a6464a2190e6d40349de39e0"
  );
  res.json(api.data);
});

//국내 서버 요청(카테고리)
news.get("/categoryko", async function (req, res) {
  const { category } = req.query;
  const api = await axios.get(
    `https://api-v2.deepsearch.com/v1/articles/${category}?date_from=2024-10-23&date_to=2024-10-24&api_key=30c89185a6464a2190e6d40349de39e0`
  );
  res.json(api.data);
});

module.exports = news;
