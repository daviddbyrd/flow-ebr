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
      hashedPassword: {
        S: "$2b$10$rt3Fv4Bf.HmRYuWEbbNgUeY6X1cJkXnMWFYWPQ6Yu/ctDEUsNOXWG",
      },
      access: {
        L: [
          {
            M: {
              organisationId: { S: "1" },
              role: { S: "admin" },
            },
          },
          {
            M: {
              organisationId: { S: "2" },
              role: { S: "admin" },
            },
          },
          {
            M: {
              organisationId: { S: "3" },
              role: { S: "admin" },
            },
          },
        ],
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
  {
    TableName: "FlowEBR_ProcessUnits_Dev",
    Item: {
      locationId: { S: "1" },
      processUnitId: { S: "1" },
      name: { S: "Vial Filling" },
    },
  },
  {
    TableName: "FlowEBR_ProcessUnits_Dev",
    Item: {
      locationId: { S: "1" },
      processUnitId: { S: "2" },
      name: { S: "Syringe Filling" },
    },
  },
  {
    TableName: "FlowEBR_ProductionOrders_Dev",
    Item: {
      processUnitId: { S: "1" },
      productionOrderId: { S: "1" },
      name: { S: "Vaccine Batch 1234" },
    },
  },
  {
    TableName: "FlowEBR_ProductionOrders_Dev",
    Item: {
      processUnitId: { S: "1" },
      productionOrderId: { S: "2" },
      name: { S: "Biologics Batch 717" },
    },
  },
  {
    TableName: "FlowEBR_ProductionOrders_Dev",
    Item: {
      processUnitId: { S: "2" },
      productionOrderId: { S: "3" },
      name: { S: "Vaccine Batch 4784" },
    },
  },
  {
    TableName: "FlowEBR_ProductionOrders_Dev",
    Item: {
      processUnitId: { S: "2" },
      productionOrderId: { S: "4" },
      name: { S: "Process Simulation 27" },
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
