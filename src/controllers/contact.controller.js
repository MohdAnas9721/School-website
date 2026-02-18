const Contact = require("../models/Contact");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function createContact(req, res) {
  try {
    const { firstName, lastName, email, phone, message } = req.body || {};

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: "First name, last name, email, and message are required." });
    }

    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const doc = await Contact.create({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      message: String(message).trim(),
    });

    return res.status(201).json({
      message: "Your message has been sent successfully.",
      id: doc._id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to send message." });
  }
}

module.exports = { createContact };
