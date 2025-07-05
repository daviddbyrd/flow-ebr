import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-west-1",
  endpoint: "http://localhost:8000",
});

const items: PutItemCommandInput[] = [
  {
    TableName: "FlowEBR_Users_Dev",
    Item: {
      userId: { S: "1" },
      username: { S: "john" },
      email: { S: "john@example.com" },
      hashedPassword: { S: "password" },
      access: {
        M: {
          organisationId: { S: "1" },
          role: { S: "admin" },
        },
      },
    },
  },
  {
    TableName: "FlowEBR_Organisations_Dev",
    Item: {
      organisationId: { S: "1" },
      name: { S: "Bristol Myers Squibb" },
    },
  },
  {
    TableName: "FlowEBR_Organisations_Dev",
    Item: {
      organisationId: { S: "2" },
      name: { S: "MSD" },
    },
  },
  {
    TableName: "FlowEBR_Organisations_Dev",
    Item: {
      organisationId: { S: "3" },
      name: { S: "Pfizer" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "1" },
      locationId: { S: "1" },
      name: { S: "Dublin" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "1" },
      locationId: { S: "2" },
      name: { S: "Claire" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "2" },
      locationId: { S: "3" },
      name: { S: "Dublin" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "2" },
      locationId: { S: "3" },
      name: { S: "Carlow" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "2" },
      locationId: { S: "4" },
      name: { S: "Brinny" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "3" },
      locationId: { S: "5" },
      name: { S: "Dublin" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "3" },
      locationId: { S: "6" },
      name: { S: "Kildare" },
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    Item: {
      organisationId: { S: "3" },
      locationId: { S: "7" },
      name: { S: "Cork" },
    },
  },
];

async function SeedData() {
  for (const itemParams of items) {
    try {
      const command = new PutItemCommand(itemParams as PutItemCommandInput);
      await client.send(command);
    } catch (error) {
      console.error(error);
    }
  }
}

SeedData();
