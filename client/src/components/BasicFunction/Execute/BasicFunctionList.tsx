import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ExecuteBasicFunctionBox from "./ExecuteBasicFunctionBox";

const basicFunctionTypes = [
  "multipleChoice",
  "numericalEntry",
  "textEntry",
] as const;

type BasicFunctionTypes = (typeof basicFunctionTypes)[number];

interface BasicFunctionModel {
  basicFunctionId: string;
  name: string;
  prompt?: string;
  type: BasicFunctionTypes | null;
  prerequisites: string[];
  isComplete: boolean;
  isSuccess: boolean;
}

export interface OptionModel {
  name: string;
  isSuccess: boolean;
}

export interface MultipleChoiceModel extends BasicFunctionModel {
  type: "multipleChoice";
  options: OptionModel[];
  selectedOption: string | null;
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

export type SpecifiedBasicFunctionModel =
  | MultipleChoiceModel
  | NumericalEntryModel
  | TextEntryModel;

const BasicFunctionList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { processUnitId, productionOrderId } = useParams();
  const [basicFunctions, setBasicFunctions] = useState<
    SpecifiedBasicFunctionModel[]
  >([]);

  useEffect(() => {
    fetchData();
  }, [processUnitId, productionOrderId]);

  const fetchData = async () => {
    await fetchBasicFunctions();
  };

  const fetchBasicFunctions = async () => {
    const response = await axios.get(
      `${serverUrl}/production-order/${productionOrderId}/basic-functions`
    );
    console.log(response);
    if (response.status === 200) {
      setBasicFunctions(response.data);
    }
  };

  const handleSubmit = async (
    newBasicFunction: SpecifiedBasicFunctionModel
  ) => {
    console.log("submitted basic function: ", newBasicFunction);
    await axios.put(`${serverUrl}/basic-function`, {
      basicFunction: newBasicFunction,
    });
    fetchBasicFunctions();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {basicFunctions && (
        <div className="w-full flex flex-col items-center">
          {basicFunctions.map((basicFunction) => {
            return (
              <ExecuteBasicFunctionBox
                key={basicFunction.basicFunctionId}
                basicFunction={basicFunction}
                setBasicFunctions={setBasicFunctions}
                handleSubmit={handleSubmit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BasicFunctionList;
