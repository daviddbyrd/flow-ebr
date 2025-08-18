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
      name: { S: "Record Filter Lot Number" },
      prompt: { S: "Enter filter lot number" },
      type: { S: "textEntry" },
      entry: { S: "" },
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
      name: { S: "Filter Pre-Wet Check" },
      prompt: { S: "Confirm filter has been properly pre-wetted" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Pass" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Fail" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Record Filter Lot Number" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Filter Lot Number" }] },
      position: { N: "3" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-4" },
      name: { S: "Filter Bubble Point Test" },
      prompt: { S: "Enter observed bubble point (psi)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "50" },
      max: { N: "60" },
      prerequisites: { L: [{ S: "Filter Pre-Wet Check" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Filter Pre-Wet Check" }] },
      position: { N: "4" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-5" },
      name: { S: "Filter Integrity Test Result" },
      prompt: { S: "Select test result" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Pass" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Fail" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Filter Bubble Point Test" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Filter Bubble Point Test" }] },
      position: { N: "5" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-6" },
      name: { S: "Confirm VHP Cycle Parameters" },
      prompt: { S: "Enter cycle parameters document reference" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Select Master Batch Record" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Select Master Batch Record" }] },
      position: { N: "6" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-7" },
      name: { S: "Record VHP Exposure Time" },
      prompt: { S: "Enter exposure time in minutes" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "30" },
      max: { N: "60" },
      prerequisites: { L: [{ S: "Confirm VHP Cycle Parameters" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Confirm VHP Cycle Parameters" }] },
      position: { N: "7" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-8" },
      name: { S: "Record VHP Concentration" },
      prompt: { S: "Enter measured H2O2 concentration (ppm)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "350" },
      max: { N: "450" },
      prerequisites: { L: [{ S: "Record VHP Exposure Time" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record VHP Exposure Time" }] },
      position: { N: "8" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-9" },
      name: { S: "VHP Sterilization Result" },
      prompt: { S: "Select sterilization result" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Pass" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Fail" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Record VHP Concentration" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record VHP Concentration" }] },
      position: { N: "9" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-10" },
      name: { S: "Sterilization Cycle Approval" },
      prompt: { S: "Confirm sterilization cycle is approved for use" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Rejected" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "VHP Sterilization Result" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "VHP Sterilization Result" }] },
      position: { N: "10" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-11" },
      name: { S: "Confirm Filling Line Sterile Setup" },
      prompt: {
        S: "Verify filling line setup has been completed under sterile conditions",
      },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Confirmed" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Confirmed" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: {
        L: [
          { S: "Filter Integrity Test Result" },
          { S: "Sterilization Cycle Approval" },
        ],
      },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [
          { S: "Filter Integrity Test Result" },
          { S: "Sterilization Cycle Approval" },
        ],
      },
      position: { N: "11" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-12" },
      name: { S: "Check Nozzle Alignment" },
      prompt: { S: "Enter nozzle alignment offset in mm" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "-2" },
      max: { N: "2" },
      prerequisites: { L: [{ S: "Confirm Filling Line Sterile Setup" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Confirm Filling Line Sterile Setup" }],
      },
      position: { N: "12" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-13" },
      name: { S: "Record Conveyor Belt Speed" },
      prompt: { S: "Enter conveyor speed (vials/min)" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "100" },
      max: { N: "200" },
      prerequisites: { L: [{ S: "Check Nozzle Alignment" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Check Nozzle Alignment" }] },
      position: { N: "13" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-14" },
      name: { S: "Verify Starwheel Positioning" },
      prompt: {
        S: "Confirm correct positioning of starwheel for vial transfer",
      },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Correct" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Incorrect" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Record Conveyor Belt Speed" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Conveyor Belt Speed" }] },
      position: { N: "14" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-15" },
      name: { S: "Final Filling Line Position Approval" },
      prompt: { S: "Approve filling line positioning for production run" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Approved" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Verify Starwheel Positioning" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Verify Starwheel Positioning" }] },
      position: { N: "15" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-16" },
      name: { S: "Confirm Sterility Sampling Plan" },
      prompt: { S: "Confirm approved sterility sampling plan is available" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Confirmed" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Confirmed" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Select Master Batch Record" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Select Master Batch Record" }] },
      position: { N: "16" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-17" },
      name: { S: "Record Sample Point Locations" },
      prompt: { S: "Enter the number of sterility sample points prepared" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "5" },
      max: { N: "20" },
      prerequisites: { L: [{ S: "Confirm Sterility Sampling Plan" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Confirm Sterility Sampling Plan" }] },
      position: { N: "17" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-18" },
      name: { S: "Document Sample Collection" },
      prompt: {
        S: "Enter operator initials and time of sterility sample collection",
      },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Record Sample Point Locations" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Sample Point Locations" }] },
      position: { N: "18" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-19" },
      name: { S: "Verify Sample Integrity" },
      prompt: {
        S: "Confirm sterility samples are intact and correctly labeled",
      },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Verified" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Verified" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Document Sample Collection" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Document Sample Collection" }] },
      position: { N: "19" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-20" },
      name: { S: "Approve Sterility Sampling Completion" },
      prompt: { S: "Approve sterility sampling as complete and acceptable" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Approved" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Verify Sample Integrity" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Verify Sample Integrity" }] },
      position: { N: "20" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-21" },
      name: { S: "Confirm Start of Filling Run" },
      prompt: { S: "Confirm that filling process has started as per protocol" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Confirmed" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Confirmed" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Select Master Batch Record" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Select Master Batch Record" }] },
      position: { N: "21" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-22" },
      name: { S: "Record Vials Filled Count" },
      prompt: { S: "Enter the cumulative number of vials filled" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "0" },
      max: { N: "100000" },
      prerequisites: { L: [{ S: "Confirm Start of Filling Run" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Confirm Start of Filling Run" }] },
      position: { N: "22" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-23" },
      name: { S: "Document In-Process Weight Check" },
      prompt: { S: "Enter vial weight measurement result" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "95" },
      max: { N: "105" },
      prerequisites: { L: [{ S: "Record Vials Filled Count" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Vials Filled Count" }] },
      position: { N: "23" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-24" },
      name: { S: "Verify Filling Accuracy" },
      prompt: { S: "Confirm filling accuracy is within tolerance" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Within Tolerance" }, isSuccess: { BOOL: true } } },
          {
            M: { name: { S: "Out of Tolerance" }, isSuccess: { BOOL: false } },
          },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Document In-Process Weight Check" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Document In-Process Weight Check" }] },
      position: { N: "24" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-25" },
      name: { S: "Approve Filling Progress Check" },
      prompt: { S: "Approve recorded progress and continue filling" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Approved" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Verify Filling Accuracy" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Verify Filling Accuracy" }] },
      position: { N: "25" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-26" },
      name: { S: "Confirm Stopper Preparation" },
      prompt: {
        S: "Confirm that sterilized stoppers are prepared and ready for use",
      },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Prepared" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Prepared" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Select Master Batch Record" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Select Master Batch Record" }] },
      position: { N: "26" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-27" },
      name: { S: "Record Stoppering Start" },
      prompt: { S: "Enter the time when vial stoppering begins" },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Confirm Stopper Preparation" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Confirm Stopper Preparation" }] },
      position: { N: "27" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-28" },
      name: { S: "Verify Stopper Placement" },
      prompt: { S: "Confirm stoppers are properly seated on all filled vials" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Properly Seated" }, isSuccess: { BOOL: true } } },
          {
            M: {
              name: { S: "Not Properly Seated" },
              isSuccess: { BOOL: false },
            },
          },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Record Stoppering Start" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Stoppering Start" }] },
      position: { N: "28" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-29" },
      name: { S: "Record Sealing Parameters" },
      prompt: {
        S: "Enter sealing machine settings (e.g., torque, temperature)",
      },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Verify Stopper Placement" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Verify Stopper Placement" }] },
      position: { N: "29" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-30" },
      name: { S: "Approve Stoppering and Sealing Completion" },
      prompt: { S: "Approve completion of stoppering and sealing operation" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Approved" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Record Sealing Parameters" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Sealing Parameters" }] },
      position: { N: "30" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-31" },
      name: { S: "Confirm End of Filling Run" },
      prompt: {
        S: "Confirm that the filling run has been completed successfully",
      },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Confirmed" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Confirmed" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: {
        L: [
          { S: "Filter Integrity Test Result" },
          { S: "Sterilization Cycle Approval" },
          { S: "Final Filling Line Position Approval" },
          { S: "Approve Sterility Sampling Completio" },
          { S: "Approve Filling Progress Check" },
          { S: "Approve Stoppering and Sealing Completion" },
        ],
      },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [
          { S: "Filter Integrity Test Result" },
          { S: "Sterilization Cycle Approval" },
          { S: "Final Filling Line Position Approval" },
          { S: "Approve Sterility Sampling Completio" },
          { S: "Approve Filling Progress Check" },
          { S: "Approve Stoppering and Sealing Completion" },
        ],
      },
      position: { N: "31" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-32" },
      name: { S: "Record Final Vial Count" },
      prompt: { S: "Enter the final number of filled and sealed vials" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "0" },
      max: { N: "100000" },
      prerequisites: { L: [{ S: "Confirm End of Filling Run" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Confirm End of Filling Run" }] },
      position: { N: "32" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-33" },
      name: { S: "Document Yield Calculation" },
      prompt: { S: "Enter calculated yield percentage" },
      type: { S: "numericalEntry" },
      entry: { NULL: true },
      min: { N: "0" },
      max: { N: "100" },
      prerequisites: { L: [{ S: "Record Final Vial Count" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Record Final Vial Count" }] },
      position: { N: "33" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-34" },
      name: { S: "Confirm Equipment Cleaning Post-Fill" },
      prompt: {
        S: "Confirm all filling equipment has been cleaned and logged",
      },
      type: { S: "multipleChoice" },
      options: {
        L: [
          {
            M: { name: { S: "Cleaned and Logged" }, isSuccess: { BOOL: true } },
          },
          { M: { name: { S: "Not Cleaned" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Document Yield Calculation" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Document Yield Calculation" }] },
      position: { N: "34" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-35" },
      name: { S: "Review End of Fill Documentation" },
      prompt: {
        S: "Upload or verify documentation for end of fill activities",
      },
      type: { S: "textEntry" },
      entry: { S: "" },
      prerequisites: { L: [{ S: "Confirm Equipment Cleaning Post-Fill" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: {
        L: [{ S: "Confirm Equipment Cleaning Post-Fill" }],
      },
      position: { N: "35" },
    },
  },
  {
    TableName: "FlowEBR_BasicFunctions_Dev",
    Item: {
      productionOrderId: { S: "1" },
      basicFunctionId: { S: "bf-36" },
      name: { S: "Approve End of Fill Sequence" },
      prompt: { S: "Final approval for end of fill process" },
      type: { S: "multipleChoice" },
      options: {
        L: [
          { M: { name: { S: "Approved" }, isSuccess: { BOOL: true } } },
          { M: { name: { S: "Not Approved" }, isSuccess: { BOOL: false } } },
        ],
      },
      selectedOption: { NULL: true },
      prerequisites: { L: [{ S: "Review End of Fill Documentation" }] },
      isComplete: { BOOL: false },
      isSuccess: { BOOL: false },
      isUnlocked: { BOOL: false },
      missingPrerequisites: { L: [{ S: "Review End of Fill Documentation" }] },
      position: { N: "36" },
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
