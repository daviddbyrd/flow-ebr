import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser, getUserByEmail, getUserByUsername } from "../db/client";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;

export const login = async (req: Request, res: Response) => {
  console.log("hello");
  const { email, password } = req.body;
  const response = await getUserByEmail({ email });
  console.log("hello2");
  if (!response) {
    res.status(404).json({ error: "Email not found" });
    return;
  }
  console.log("hello3");
  const isMatch = await verifyPassword(password, response.hashedPassword);
  if (isMatch) {
    const payload = {
      userId: response.userId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    res.status(201).json({ token });
  } else {
    res.status(401).json({ error: "Password does not match" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  let response = await getUserByEmail({ email });
  if (response) {
    res.status(409).json({ error: "Email already taken" });
    return;
  }
  response = await getUserByUsername({ username });
  if (response) {
    res.status(409).json({ error: "Username already taken" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userId = uuidv4();
  await addUser({
    userId,
    email,
    username,
    hashedPassword,
  });
  const payload = {
    userId,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  res.status(201).json({ token });
};

const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;
};
