import { Request, Response } from "express";
import { docClient } from "../db/client";
import {
  PutCommand,
  QueryCommand,
  UpdateCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const basicFunctionTypes = [
  "multipleChoice",
  "numericalEntry",
  "textEntry",
] as const;

type BasicFunctionTypes = (typeof basicFunctionTypes)[number];

interface BasicFunctionModel {
  productionOrderId: string;
  basicFunctionId: string;
  name: string;
  prompt?: string;
  type: BasicFunctionTypes | null;
  prerequisites: string[];
  isComplete: boolean;
  isSuccess: boolean;
}

interface OptionModel {
  name: string;
  isSuccess: boolean;
}

export interface MultipleChoiceModel extends BasicFunctionModel {
  type: "multipleChoice";
  options: OptionModel[];
  selectedOption: string;
}

export interface NumericalEntryModel extends BasicFunctionModel {
  type: "numericalEntry";
  entry: number;
  min?: number;
  max?: number;
}

export interface TextEntryModel extends BasicFunctionModel {
  type: "textEntry";
  entry: string;
}

type SpecifiedBasicFunctionModel =
  | MultipleChoiceModel
  | NumericalEntryModel
  | TextEntryModel;

export const createBasicFunction = async (req: Request, res: Response) => {
  const { basicFunction } = req.body;
  basicFunction["productionOrderId"] = basicFunction.productionOrderId;
  const basicFunctionId = uuidv4();
  basicFunction["basicFunctionId"] = basicFunctionId;
  if (basicFunction.prerequisites.length > 0) {
    basicFunction["isUnlocked"] = false;
  }
  await addBasicFunction(basicFunction);
  res.status(201).json({ basicFunctionId });
};

export const updateBasicFunction = async (req: Request, res: Response) => {
  let { basicFunction } = req.body;
  console.log(basicFunction);
  const params = {
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    Key: {
      productionOrderId: basicFunction.productionOrderId,
      basicFunctionId: basicFunction.basicFunctionId,
    },
  };
  const response = await docClient.send(new GetCommand(params));
  const oldBasicFunction = response.Item as
    | SpecifiedBasicFunctionModel
    | undefined;
  if (!oldBasicFunction) {
    res.status(200).json({ message: "No matching bf." });
    return;
  }
  basicFunction = updateBasicFunctionStatus(basicFunction);
  await addBasicFunction(basicFunction);
  if (checkForChange(basicFunction, oldBasicFunction)) {
    await updateUnlockedStatus(basicFunction.productionOrderId);
    res.status(200).json({ change: true });
  } else {
    res.status(200).json({ change: false });
  }
};

export const editBasicFunction = async (req: Request, res: Response) => {
  const { basicFunction } = req.body;
  await addBasicFunction(basicFunction);
  res.status(200).send();
};

const addBasicFunction = async (basicFunction: SpecifiedBasicFunctionModel) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.BASIC_FUNCTIONS_TABLE,
      Item: basicFunction,
    })
  );
};

const updateBasicFunctionStatus = (
  basicFunction: SpecifiedBasicFunctionModel
) => {
  switch (basicFunction.type) {
    case "multipleChoice":
      return updateMultipleChoiceStatus(basicFunction);
    case "numericalEntry":
      return updateNumericalEntryStatus(basicFunction);
    case "textEntry":
      return updateTextEntryStatus(basicFunction);
  }
};

const updateMultipleChoiceStatus = (basicFunction: MultipleChoiceModel) => {
  for (const option of basicFunction.options) {
    if (option.name === basicFunction.selectedOption) {
      if (option.isSuccess) {
        basicFunction.isSuccess = true;
      } else {
        basicFunction.isSuccess = false;
      }
      basicFunction.isComplete = true;
    }
  }
  return basicFunction;
};

const updateNumericalEntryStatus = (basicFunction: NumericalEntryModel) => {
  if (
    "min" in basicFunction &&
    typeof basicFunction.min == "number" &&
    basicFunction.entry < basicFunction.min
  ) {
    basicFunction.isSuccess = false;
  } else if (
    "max" in basicFunction &&
    typeof basicFunction.max == "number" &&
    basicFunction.entry > basicFunction.max
  ) {
    basicFunction.isSuccess = false;
  } else {
    basicFunction.isSuccess = true;
  }
  basicFunction.isComplete = true;
  return basicFunction;
};

const updateTextEntryStatus = (basicFunction: TextEntryModel) => {
  if (basicFunction.entry) {
    basicFunction.isSuccess = true;
    basicFunction.isComplete = true;
  } else {
    basicFunction.isSuccess = false;
    basicFunction.isComplete = false;
  }
  return basicFunction;
};

// To add: error checking and checking for changes other than isComplete and isSuccess
const checkForChange = (
  basicFunction1: SpecifiedBasicFunctionModel,
  basicFunction2: SpecifiedBasicFunctionModel
) => {
  if (
    basicFunction1.isComplete === basicFunction2.isComplete &&
    basicFunction1.isSuccess === basicFunction2.isSuccess
  ) {
    return false;
  } else {
    return true;
  }
};

const updateUnlockedStatus = async (productionOrderId: string) => {
  const params = {
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    KeyConditionExpression: "productionOrderId = :poId",
    ExpressionAttributeValues: {
      ":poId": productionOrderId,
    },
  };
  const response = await docClient.send(new QueryCommand(params));

  const basicFunctions: Record<string, { isSuccess: boolean; name: string }> =
    {};

  for (const basicFunction of response.Items ?? []) {
    basicFunctions[basicFunction.basicFunctionId] = {
      isSuccess: basicFunction.isSuccess,
      name: basicFunction.name,
    };
  }

  for (const basicFunction of response.Items ?? []) {
    const missingPrerequisites = [];
    for (const preRequisiteId of basicFunction.prerequisites) {
      if (!basicFunctions.preRequisiteId.isSuccess) {
        missingPrerequisites.push(basicFunctions.prerequisiteId.name);
      }
    }
    const isUnlocked = missingPrerequisites.length === 0;
    await setUnlocked(
      (basicFunction as SpecifiedBasicFunctionModel) || undefined,
      isUnlocked
    );
    await setMissingPrerequisites(
      (basicFunction as SpecifiedBasicFunctionModel) || undefined,
      missingPrerequisites
    );
  }
};

const setUnlocked = async (
  basicFunction: SpecifiedBasicFunctionModel,
  isUnlocked: boolean
) => {
  const params = {
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    Key: {
      PrimaryKey: basicFunction.productionOrderId,
      SortKey: basicFunction.basicFunctionId,
    },
    UpdateExpression: "SET #attrName = :attrValue",
    ExpressionAttributeNames: {
      "#attrName": "isUnlocked",
    },
    ExpressionAttributeValues: {
      ":attrValue": isUnlocked,
    },
  };
  const response = await docClient.send(new UpdateCommand(params));
};

const setMissingPrerequisites = async (
  basicFunction: SpecifiedBasicFunctionModel,
  missingPrerequisites: string[]
) => {
  const params = {
    TableName: process.env.BASIC_FUNCTIONS_TABLE,
    Key: {
      PrimaryKey: basicFunction.productionOrderId,
      SortKey: basicFunction.basicFunctionId,
    },
    UpdateExpression: "SET #attrName = :attrValue",
    ExpressionAttributeNames: {
      "#attrName": "missingPrerequisites",
    },
    ExpressionAttributeValues: {
      "#attrValue": missingPrerequisites,
    },
  };
  const response = await docClient.send(new UpdateCommand(params));
};
