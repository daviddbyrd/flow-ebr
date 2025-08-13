import { Request, Response } from "express";
import { getUserById, getUserByUsername } from "../db/client";
import { getOrganisation } from "./orgControllers";
import { docClient } from "../db/client";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

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

export const getAdminOrganisations = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await getUserById({ userId });
  const organisations = [];
  for (const accessObject of user?.access) {
    if (accessObject.role === "admin") {
      const organisation = await getOrganisation(accessObject.organisationId);
      organisations.push(organisation);
    }
  }
  res.status(200).json(organisations);
};

export const grantAccess = async (req: Request, res: Response) => {
  const { username, organisationId, role } = req.body;
  const user = await getUserByUsername({ username });
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { userId: user?.userId },
    UpdateExpression:
      "SET myList = list_append(if_not_exists(myList, :empty_list), :new_items)",
    ExpressionAttributeValues: {
      ":new_items": [{ organisationId: organisationId, role: role }],
      ":empty_list": [],
    },
  };

  await docClient.send(new UpdateCommand(params));
  res.status(200).send();
};
