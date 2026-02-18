const News = require("../models/News");

async function listNews(req, res) {
  const items = await News.find().sort({ publishedAt: -1 }).limit(20);
  res.json(items);
}

async function createNews(req, res) {
  const { title, summary, imageUrl } = req.body;
  const item = await News.create({ title, summary, imageUrl });
  res.status(201).json(item);
}

module.exports = { listNews, createNews };