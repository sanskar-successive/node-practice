import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "username already taken" });
    }

    const newUser = new User({ username, password });

    await newUser.save();

    res.status(201).json({ message: "user register successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, '123');

    res.status(200).json({token})
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"Internal server error"})
  }
};
