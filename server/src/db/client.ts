import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
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
  userId: string;
  email: string;
  username: string;
  hashedPassword: string;
}

export const addUser = async (user: User) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.USERS_TABLE,
      Item: user,
    })
  );
};

export const getUserById = async ({ userId }: { userId: string }) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      userId: userId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));
  if (response.Count && response.Items) {
    return response.Items[0];
  } else {
    return null;
  }
};

export const getUserByEmail = async ({ email }: { email: string }) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: "EmailIndex",
    KeyConditionExpression: "#eml = :emailVal",
    ExpressionAttributeNames: {
      "#eml": "email",
    },
    ExpressionAttributeValues: {
      ":emailVal": email,
    },
  };

  const response = await docClient.send(new QueryCommand(params));
  if (response.Count && response.Items) {
    return response.Items[0];
  } else {
    return null;
  }
};

export const getUserByUsername = async ({ username }: { username: string }) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: "UsernameIndex",
    KeyConditionExpression: "#usr = :usernameVal",
    ExpressionAttributeNames: {
      "#usr": "username",
    },
    ExpressionAttributeValues: {
      ":usernameVal": username,
    },
  };

  const response = await docClient.send(new QueryCommand(params));
  if (response.Count && response.Items) {
    return response.Items[0];
  } else {
    return null;
  }
};

interface AddUserAccessProps {
  userId: string;
  organisationId: string;
  role: "admin" | "user";
}

export const addUserAccess = async ({
  userId,
  organisationId,
  role,
}: AddUserAccessProps) => {
  const params = {
    TableName: process.env.USERS_TABLE,
    Key: { userId: userId },
    UpdateExpression:
      "SET #ac = list_append(if_not_exists(#ac, :emptyList), :newRole)",
    ExpressionAttributeNames: {
      "#ac": "access",
    },
    ExpressionAttributeValues: {
      ":newRole": [
        {
          organisationId: organisationId,
          role: role,
        },
      ],
      ":emptyList": [],
    },
  };
  await docClient.send(new UpdateCommand(params));
};
