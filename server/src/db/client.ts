import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  region: "eu-north-1",
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});

export const scanTable = async (tableName: string) => {
  const command = new ScanCommand({ TableName: tableName });
  const result = await client.send(command);
  return result.Items;
};
