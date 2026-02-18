const Event = require("../models/Event");

async function listEvents(req, res) {
  const items = await Event.find().sort({ date: 1 }).limit(50);
  res.json(items);
}

async function createEvent(req, res) {
  const { title, date, location, description } = req.body;
  const item = await Event.create({ title, date, location, description });
  res.status(201).json(item);
}

module.exports = { listEvents, createEvent };