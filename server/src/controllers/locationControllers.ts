import { Request, Response } from "express";
import { docClient } from "../db/client";
import { QueryCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

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

export const createLocation = async (req: Request, res: Response) => {
  const { name, organisationId } = req.body;
  console.log("name: ", name, " orgnanisationId: ", organisationId);
  const isUnique = await isUniqueLocationName(name, organisationId);
  console.log("isUnique:", isUnique);
  if (isUnique) {
    const locationId = uuidv4();
    await addLocation({
      locationId,
      organisationId,
      name,
    });
    res.status(201).json({ locationId });
  } else {
    res.status(409).json({ error: "Location name is already taken." });
  }
};

const isUniqueLocationName = async (name: string, organisationId: string) => {
  const params = {
    TableName: process.env.LOCATIONS_TABLE,
    KeyConditionExpression: "organisationId = :orgId",
    FilterExpression: "#n = :locationName",
    ExpressionAttributeNames: {
      "#n": "name",
    },
    ExpressionAttributeValues: {
      ":orgId": organisationId,
      ":locationName": name,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  console.log("response: ", response);
  if ((response.Count ?? 0) === 0) {
    return true;
  } else {
    return false;
  }
};

interface Location {
  organisationId: string;
  locationId: string;
  name: string;
}

const addLocation = async (location: Location) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.ORGANISATIONS_TABLE,
      Item: location,
    })
  );
};
