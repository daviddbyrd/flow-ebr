import { Request, Response } from "express";
import { docClient } from "../db/client";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const basicFunctionTypes = [
  "multipleChoice",
  "numericalEntry",
  "textEntry",
] as const;

type BasicFunctionTypes = (typeof basicFunctionTypes)[number];

interface BasicFunctionModel {
  name: string;
  type: BasicFunctionTypes | null;
}

export interface MultipleChoiceModel extends BasicFunctionModel {
  type: "multipleChoice";
  prompt: string;
  options: string[];
  successOptions: string[];
}

export interface NumericalEntryModel extends BasicFunctionModel {
  type: "numericalEntry";
  min?: number;
  max?: number;
}

export interface TextEntryModel extends BasicFunctionModel {
  type: "textEntry";
  prompt: string;
}

type SpecifiedBasicFunctionModel =
  | MultipleChoiceModel
  | NumericalEntryModel
  | TextEntryModel;

export const createBasicFunction = async (req: Request, res: Response) => {
  const { basicFunction, productionOrderId } = req.body;
  console.log(
    "basic function: ",
    basicFunction,
    "productionOrderId: ",
    productionOrderId
  );
  basicFunction["productionOrderId"] = productionOrderId;
  const basicFunctionId = uuidv4();
  basicFunction["basicFunctionId"] = basicFunctionId;
  await addBasicFunction(basicFunction);
  res.status(201).json({ basicFunctionId });
};

const addBasicFunction = async (basicFunction: SpecifiedBasicFunctionModel) => {
  await docClient.send(
    new PutCommand({
      TableName: process.env.BASIC_FUNCTIONS_TABLE,
      Item: basicFunction,
    })
  );
};
