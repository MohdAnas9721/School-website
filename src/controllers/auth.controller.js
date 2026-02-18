const User = require("../models/User");
const { signToken } = require("../utils/token");

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "name, email, password required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already exists" });

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({ name, email, passwordHash, role: "admin" });

  const token = signToken({ id: user._id, role: user.role });
  res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user._id, role: user.role });
  res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
}

module.exports = { register, login };