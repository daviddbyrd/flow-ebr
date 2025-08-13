import { Request, Response } from "express";
import { docClient } from "../db/client";
import {
  QueryCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export const getBasicFunctionsRoute = async (req: Request, res: Response) => {
  const { productionOrderId } = req.params;
  const basicFunctions = await getBasicFunctions(productionOrderId);
  res.status(200).json(basicFunctions);
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

export const reorder = async (req: Request, res: Response) => {
  const { basicFunctions } = req.body;
  const { productionOrderId } = req.params;
  for (const basicFunction of basicFunctions) {
    const params = {
      TableName: process.env.BASIC_FUNCTIONS_TABLE,
      Key: {
        productionOrderId: basicFunction.productionOrderId,
        basicFunctionId: basicFunction.basicFunctionId,
      },
      UpdateExpression: "SET #attrName = :attrValue",
      ExpressionAttributeNames: {
        "#attrName": "position",
      },
      ExpressionAttributeValues: {
        ":attrValue": basicFunction.position,
      },
    };
    await docClient.send(new UpdateCommand(params));
  }
  const newBasicFunctions = await getBasicFunctions(productionOrderId);
  res.status(200).json(newBasicFunctions);
};

export const getBasicFunctions = async (productionOrderId: string) => {
  const params = {
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    KeyConditionExpression: "productionOrderId = :poId",
    ExpressionAttributeValues: {
      ":poId": productionOrderId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  return response.Items;
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
