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

  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-1" },
      name: { S: "Select Master Batch Record" },
      prompt: { S: "Choose MBR template" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "MBR-001 10 mL" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "MBR-002 20 mL" }, isSuccess: { BOOL: true } } },
          {
            M: {
              name: { S: "MBR-003 Lyophilized" },
              isSuccess: { BOOL: true },
            },
          },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: true },
      missingPrerequisites: { L: [] },
      position: { N: "1" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-2" },
      name: { S: "Line Clearance Confirmation" },
      prompt: { S: "Line cleared?" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Yes" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "No" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Select Master Batch Record" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Select Master Batch Record" }] },
      position: { N: "2" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-3" },
      name: { S: "Cleanroom Grade Check" },
      prompt: { S: "Current area grade" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Grade A" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Grade B" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Other" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Line Clearance Confirmation" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Line Clearance Confirmation" }] },
      position: { N: "3" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-4" },
      name: { S: "Record Filling Machine ID" },
      prompt: { S: "Enter filler ID and status" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Cleanroom Grade Check" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Cleanroom Grade Check" }] },
      position: { N: "4" },
    },
  },

  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-5" },
      name: { S: "Calibration Verification" },
      prompt: { S: "Calibration within due date?" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Yes" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "No" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Record Filling Machine ID" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Filling Machine ID" }] },
      position: { N: "5" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-6" },
      name: { S: "Cleaning Verification" },
      prompt: { S: "Enter cleaning record ID and detergent lot" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Calibration Verification" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Calibration Verification" }] },
      position: { N: "6" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-7" },
      name: { S: "Select Sterilizing Filter Lot" },
      prompt: { S: "Enter 0.22 µm filter lot/expiry" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Cleaning Verification" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Cleaning Verification" }] },
      position: { N: "7" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-8" },
      name: { S: "Pre-Use Filter Integrity (Bubble Point)" },
      prompt: { S: "Bubble point (psi)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "48" },
      max: { N: "60" },
      prerequisites: { L: [{ S: "Select Sterilizing Filter Lot" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Select Sterilizing Filter Lot" }] },
      position: { N: "8" },
    },
  },

  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-9" },
      name: { S: "Bulk Solution Batch Record" },
      prompt: { S: "Enter drug product bulk lot and compounding record" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Pre-Use Filter Integrity (Bubble Point)" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Pre-Use Filter Integrity (Bubble Point)" }],
      },
      position: { N: "9" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-10" },
      name: { S: "Bulk Solution pH" },
      prompt: { S: "pH at fill" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "6.8" },
      max: { N: "7.2" },
      prerequisites: { L: [{ S: "Bulk Solution Batch Record" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Bulk Solution Batch Record" }] },
      position: { N: "10" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-11" },
      name: { S: "Bulk Temperature at Fill" },
      prompt: { S: "Temperature (°C)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "2" },
      max: { N: "25" },
      prerequisites: { L: [{ S: "Bulk Solution pH" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Bulk Solution pH" }] },
      position: { N: "11" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-12" },
      name: { S: "Target Fill Volume Selection" },
      prompt: { S: "Target fill per vial" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "10 mL ± 0.2 mL" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "20 mL ± 0.3 mL" }, isSuccess: { BOOL: true } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Bulk Temperature at Fill" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Bulk Temperature at Fill" }] },
      position: { N: "12" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-13" },
      name: { S: "Pre-Fill Tare Weight (Avg of n vials)" },
      prompt: { S: "Average tare (g)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "8.95" },
      max: { N: "9.05" },
      prerequisites: { L: [{ S: "Target Fill Volume Selection" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Target Fill Volume Selection" }] },
      position: { N: "13" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-14" },
      name: { S: "In-Process Filled Weight (Avg)" },
      prompt: { S: "Average filled weight (g)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "18.95" },
      max: { N: "19.25" },
      prerequisites: { L: [{ S: "Pre-Fill Tare Weight (Avg of n vials)" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Pre-Fill Tare Weight (Avg of n vials)" }],
      },
      position: { N: "14" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-15" },
      name: { S: "In-Process Visual Inspection" },
      prompt: { S: "Particulates/defects observed?" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Pass" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Fail" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "In-Process Filled Weight (Avg)" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "In-Process Filled Weight (Avg)" }] },
      position: { N: "15" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-16" },
      name: { S: "Operator E-Signature" },
      prompt: { S: "Full name + employee ID" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "In-Process Visual Inspection" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "In-Process Visual Inspection" }] },
      position: { N: "16" },
    },
  },

  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-17" },
      name: { S: "Supervisor Approval to Proceed to Sealing" },
      prompt: { S: "Approve to sealing/crimping?" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Rejected" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Operator E-Signature" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Operator E-Signature" }] },
      position: { N: "17" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-18" },
      name: { S: "Record Crimping/Sealing Machine ID" },
      prompt: { S: "Enter crimper ID and calibration status" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: {
        L: [{ S: "Supervisor Approval to Proceed to Sealing" }],
      },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Supervisor Approval to Proceed to Sealing" }],
      },
      position: { N: "18" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-19" },
      name: { S: "Crimp Parameters (Setpoint Verification)" },
      prompt: { S: "Enter crimp force or height setpoint and verified value" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "120" },
      max: { N: "160" },
      prerequisites: { L: [{ S: "Record Crimping/Sealing Machine ID" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Record Crimping/Sealing Machine ID" }],
      },
      position: { N: "19" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-20" },
      name: { S: "Final Batch Yield & Reconciliation" },
      prompt: {
        S: "Good vials, rejects, components used, reconciliation % loss",
      },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "98" },
      max: { N: "100" },
      prerequisites: { L: [{ S: "Crimp Parameters (Setpoint Verification)" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Crimp Parameters (Setpoint Verification)" }],
      },
      position: { N: "20" },
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
