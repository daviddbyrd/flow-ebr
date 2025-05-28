import { Request, Response } from "express";
import { getUserById } from "../db/client";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = getUserById({ id });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
