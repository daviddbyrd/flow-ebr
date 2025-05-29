import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

export const getBasicFunctions = async (req: Request, res: Response) => {
  const { productionOrderId } = req.params;
  const params = {
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    KeyConditionExpression: "productionOrderId = :poId",
    ExpressionAttributeValues: {
      ":poId": productionOrderId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  res.status(200).json(response.Items);
};

export const getBasicFunction = async (req: Request, res: Response) => {
  const { productionOrderId, basicFunctionId } = req.params;
  const params = {
    TableName: process.env.PRODUCTION_ORDERS_TABLE,
    Key: {
      productionOrderId: productionOrderId,
      basicFunctionId: basicFunctionId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  res.status(200).json(response.Item);
};
