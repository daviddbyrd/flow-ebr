import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

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

export const getProcessUnit = async (req: Request, res: Response) => {
  const { locationId, processUnitId } = req.params;
  const params = {
    TableName: process.env.PROCESS_UNITS_TABLE,
    Key: {
      locationId: locationId,
      processUnitId: processUnitId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  res.status(200).json(response.Item);
};
