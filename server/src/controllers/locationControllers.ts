import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const getProcessUnits = async (req: Request, res: Response) => {
  const { locationId } = req.params;
  const params = {
    TableName: process.env.PROCESS_UNITS_TABLE,
    KeyConditionExpression: "locationId = :locId",
    ExpressionAttributeValues: {
      ":locId": locationId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  res.status(200).json(response.Items);
};
