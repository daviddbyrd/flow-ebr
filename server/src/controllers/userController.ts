import { Request, Response } from "express";
import { getUserById } from "../db/client";

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getUserById({ userId });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const getAccess = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log("userId: ", userId);
  const user = await getUserById({ userId });
  if (user) {
    res.status(200).json(user.access);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
