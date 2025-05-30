import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

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

export const getProductionOrder = async (req: Request, res: Response) => {
  const { processUnitId, productionOrderId } = req.params;
  const params = {
    TableName: process.env.PRODUCTION_ORDERS_TABLE,
    Key: {
      processUnitId: processUnitId,
      productionOrderId: productionOrderId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  res.status(200).json(response.Item);
};

export const createProcessUnit = async (req: Request, res: Response) => {
  const { name, locationId } = req.body;
  const isUnique = await isUniqueProcessUnitName(name, locationId);
  if (isUnique) {
    const processUnitId = uuidv4();
    await addProcessUnit({
      locationId,
      processUnitId,
      name,
    });
    res.status(201).json({ processUnitId });
  } else {
    res.status(409).json({ error: "Process unit name is already taken." });
  }
};

const isUniqueProcessUnitName = async (name: string, locationId: string) => {
  const params = {
    TableName: process.env.PROCESS_UNITS_TABLE,
    KeyConditionExpression: "locationId = :locId",
    FilterExpression: "#n = :processUnitName",
    ExpressionAttributeNames: {
      "#n": "name",
    },
    ExpressionAttributeValues: {
      ":locId": locationId,
      ":processUnitName": name,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  if ((response.Count ?? 0) === 0) {
    return true;
  } else {
    return false;
  }
};

interface ProcessUnit {
  locationId: string;
  processUnitId: string;
  name: string;
}

const addProcessUnit = async (processUnit: ProcessUnit) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.PROCESS_UNITS_TABLE,
      Item: processUnit,
    })
  );
};
