import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

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
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    Key: {
      productionOrderId: productionOrderId,
      basicFunctionId: basicFunctionId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  res.status(200).json(response.Item);
};

export const createProductionOrder = async (req: Request, res: Response) => {
  const { name, processUnitId } = req.body;
  const isUnique = await isUniqueProductionOrderName(name, processUnitId);
  if (isUnique) {
    const productionOrderId = uuidv4();
    await addProductionOrder({
      processUnitId,
      productionOrderId,
      name,
    });
    res.status(201).json({ productionOrderId });
  } else {
    res.status(409).json({ error: "Production order name is already taken." });
  }
};

const isUniqueProductionOrderName = async (
  name: string,
  processUnitId: string
) => {
  const params = {
    TableName: process.env.PRODUCTION_ORDERS_TABLE,
    KeyConditionExpression: "processUnitId = :puId",
    FilterExpression: "#n = :productionOrderName",
    ExpressionAttributeNames: {
      "#n": "name",
    },
    ExpressionAttributeValues: {
      ":puId": processUnitId,
      ":productionOrderName": name,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  if ((response.Count ?? 0) === 0) {
    return true;
  } else {
    return false;
  }
};

interface ProductionOrder {
  processUnitId: string;
  productionOrderId: string;
  name: string;
}

const addProductionOrder = async (productionOrder: ProductionOrder) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.PRODUCTION_ORDERS_TABLE,
      Item: productionOrder,
    })
  );
};
