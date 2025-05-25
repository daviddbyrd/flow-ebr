import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

export const client = new DynamoDBClient({
  region: "eu-north-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});
export const docClient = DynamoDBDocumentClient.from(client);

export const scanTable = async (tableName: string) => {
  const command = new ScanCommand({ TableName: tableName });
  const result = await docClient.send(command);
  return result.Items;
};

interface User {
  id: string;
  email: string;
  username: string;
  hashedPassword: string;
}

export const addUser = async (user: User) => {
  console.log("user:", user);
  await docClient.send(
    new PutCommand({
      TableName: process.env.USERS_TABLE,
      Item: user,
    })
  );
};
