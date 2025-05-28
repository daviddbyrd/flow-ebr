import { Request, Response } from "express";
import { docClient } from "../db/client";
import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const getOrganisation = async (req: Request, res: Response) => {
  const { organisationId } = req.params;
  const params = {
    TableName: process.env.ORGANISATIONS_TABLE,
    Key: {
      id: organisationId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  console.log("response:, ", response);
  res.status(200).json(response);
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
