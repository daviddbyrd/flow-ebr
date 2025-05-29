import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const getProductionOrders = async (req: Request, res: Response) => {
  const { processUnitId } = req.params;
  const params = {
    TableName: process.env.PRODUCTION_ORDERS_TABLE,
    KeyConditionExpression: "processUnitId = :puId",
    ExpressionAttributeValues: {
      ":puId": processUnitId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  res.status(200).json(response.Items);
};
