import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { docClient } from "./db/client";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { addUser } from "./db/client";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await getUserByEmail({ email });
  if (!response) {
    res.status(404).json({ error: "Email not found" });
    return;
  }
  const isMatch = await verifyPassword(password, response.hashedPassword);
  if (isMatch) {
    const payload = { id: response.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    res.status(201).json({ token });
  } else {
    res.status(401).json({ error: "Password does not match" });
  }
};

export const signup = async (req: Request, res: Response) => {
  console.log(req.body);
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
  await addUser({
    id: uuidv4(),
    email,
    username,
    hashedPassword,
  });
  res.status(201).json({ message: "Sign up successful." });
};

const getUserByEmail = async ({ email }: { email: string }) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "#eml = :emailVal",
    ExpressionAttributeNames: {
      "#eml": "email",
    },
    ExpressionAttributeValues: {
      ":emailVal": email,
    },
  };
  console.log("got here 1");
  console.log("table name:", process.env.USERS_TABLE);
  const data = await docClient.send(new QueryCommand(params));
  console.log("data:", data);
  if (data.Count && data.Items) {
    return data.Items[0];
  } else {
    return null;
  }
};

const getUserByUsername = async ({ username }: { username: string }) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: "UsernameIndex",
    KeyConditionExpression: "#usr = :usernameVal",
    ExpressionAttributeNames: {
      "#usr": "username",
    },
    ExpressionAttributeValues: {
      ":usernameVal": username,
    },
  };

  const data = await docClient.send(new QueryCommand(params));
  if (data.Count && data.Items) {
    return data.Items[0];
  } else {
    return null;
  }
};

const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;
};
