import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "eu-west-1",
  endpoint: "http://localhost:8000",
});

const tables: CreateTableCommandInput[] = [
  {
    TableName: "FlowEBR_Organisations_Dev",
    KeySchema: [{ AttributeName: "organisationId", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "organisationId", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "FlowEBR_Locations_Dev",
    KeySchema: [
      { AttributeName: "organisationId", KeyType: "HASH" },
      { AttributeName: "locationId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "organisationId", AttributeType: "S" },
      { AttributeName: "locationId", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "FlowEBR_ProcessUnits_Dev",
    KeySchema: [
      { AttributeName: "locationId", KeyType: "HASH" },
      { AttributeName: "processUnitId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "locationId", AttributeType: "S" },
      { AttributeName: "processUnitId", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "FlowEBR_ProductionOrders_Dev",
    KeySchema: [
      { AttributeName: "processUnitId", KeyType: "HASH" },
      { AttributeName: "productionOrderId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "processUnitId", AttributeType: "S" },
      { AttributeName: "productionOrderId", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    KeySchema: [
      { AttributeName: "productionOrderId", KeyType: "HASH" },
      { AttributeName: "basicFunctionId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "productionOrderId", AttributeType: "S" },
      { AttributeName: "basicFunctionId", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "FlowEBR_Users_Dev",
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "S" },
      { AttributeName: "username", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "UsernameIndex",
        KeySchema: [{ AttributeName: "username", KeyType: "HASH" }],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  },
];

async function createTables() {
  for (const table of tables) {
    try {
      const command = new CreateTableCommand(table);
      const response = await client.send(command);
    } catch (error) {
      console.error(error);
    }
  }
}

createTables();
