const express = require("express");
const news = express.Router();
const axios = require("axios");

// 현재 날짜를 YYYY-MM-DD 형식으로 포맷팅하는 함수
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 기본 뉴스 요청 (최신 날짜 기준)
news.get("/", async function (req, res) {
  const today = getCurrentDate(); // 오늘 날짜 가져오기
  const api = await axios.get(
    `https://api-v2.deepsearch.com/v1/global-articles?date_from=${today}&date_to=${today}&api_key=30c89185a6464a2190e6d40349de39e0`
  );
  res.json(api.data);
});

// 각 카테고리별 데이터 요청 (최신 날짜 기준)
news.get("/category", async function (req, res) {
  const { category } = req.query;
  const today = getCurrentDate(); // 오늘 날짜 가져오기
  const api = await axios.get(
    `https://api-v2.deepsearch.com/v1/global-articles/${category}?date_from=${today}&date_to=${today}&api_key=30c89185a6464a2190e6d40349de39e0`
  );
  res.json(api.data);
});

// 국내 서버 요청 (기본, 최신 날짜 기준)
news.get("/ko", async function (req, res) {
  const today = getCurrentDate(); // 오늘 날짜 가져오기
  const api = await axios.get(
    `https://api-v2.deepsearch.com/v1/articles?date_from=${today}&date_to=${today}&api_key=30c89185a6464a2190e6d40349de39e0`
  );
  res.json(api.data);
});

// 국내 서버 요청 (카테고리, 최신 날짜 기준)
news.get("/categoryko", async function (req, res) {
  const { category } = req.query;
  const today = getCurrentDate(); // 오늘 날짜 가져오기
  const api = await axios.get(
    `https://api-v2.deepsearch.com/v1/articles/${category}?date_from=${today}&date_to=${today}&api_key=30c89185a6464a2190e6d40349de39e0`
  );
  res.json(api.data);
});

module.exports = news;
