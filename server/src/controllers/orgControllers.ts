import { Request, Response } from "express";
import { docClient } from "../db/client";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getOrganisation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const params = {
    TableName: process.env.ORGANISATIONS_TABLE,
    Key: {
      id: id,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  console.log("response:, ", response);
  res.status(200).json(response);
};
