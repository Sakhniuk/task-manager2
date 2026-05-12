const jwt = require('jsonwebtoken');

const users = [];

exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Invalid data");
  }

  users.push({ email, password });

  const token = jwt.sign({ email }, "secret");

  res.status(201).json({ token });
};