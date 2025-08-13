import { Request, Response } from "express";
import { docClient, addUserAccess } from "../db/client";
import { GetCommand, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export const getOrganisationRoute = async (req: Request, res: Response) => {
  const { organisationId } = req.params;
  const organisation = getOrganisation(organisationId);
  res.status(200).json(organisation);
};

export const getLocations = async (req: Request, res: Response) => {
  const { organisationId } = req.params;
  const params = {
    TableName: process.env.LOCATIONS_TABLE,
    KeyConditionExpression: "organisationId = :orgId",
    ExpressionAttributeValues: {
      ":orgId": organisationId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  res.status(200).json(response.Items);
};

export const getLocation = async (req: Request, res: Response) => {
  const { organisationId, locationId } = req.params;
  const params = {
    TableName: process.env.LOCATIONS_TABLE,
    Key: {
      organisationId: organisationId,
      locationId: locationId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  res.status(200).json(response);
};

export const createOrganisation = async (req: Request, res: Response) => {
  const { name, userId } = req.body;
  const isUnique = await isUniqueOrganisationName(name);
  if (isUnique) {
    const organisationId = uuidv4();
    console.log("1");
    await addOrganisation({
      organisationId,
      name,
    });
    console.log("2");
    await addUserAccess({
      userId: userId,
      organisationId: organisationId,
      role: "admin",
    });
    console.log("3");
    res.status(201).json({ organisationId });
  } else {
    res.status(409).json({ error: "Organisation name is already taken." });
  }
};

export const getOrganisation = async (organisationId: string) => {
  const params = {
    TableName: process.env.ORGANISATIONS_TABLE,
    Key: {
      organisationId: organisationId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  return response.Item;
};

const isUniqueOrganisationName = async (name: string) => {
  const params = {
    TableName: process.env.ORGANISATIONS_TABLE,
    IndexName: "NameIndex",
    KeyConditionExpression: "#n = :nameVal",
    ExpressionAttributeNames: {
      "#n": "name",
    },
    ExpressionAttributeValues: {
      ":nameVal": name,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  if (response.Count === 0) {
    return true;
  } else {
    return false;
  }
};

interface Organisation {
  organisationId: string;
  name: string;
}

const addOrganisation = async (organisation: Organisation) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.ORGANISATIONS_TABLE,
      Item: organisation,
    })
  );
};
