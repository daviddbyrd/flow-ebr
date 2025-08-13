import { useState, useEffect } from "react";
import axios from "axios";
import CreateBfMultipleChoice from "./MultipleChoice/CreateBfMultipleChoice";
import CreateBfNumericalEntry from "./NumericalEntry/CreateBfNumericalEntry";
import CreateBfTextEntry from "./TextEntry/CreateBfTextEntry";
import CreatePrerequisites from "./CreatePrerequisites";
import { useParams, useNavigate } from "react-router-dom";
import type { SetStateAction } from "react";

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
  isUnlocked: boolean;
  missingPrerequisites: string[];
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
  entry: number | null;
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

const basicFunctionLabels = {
  multipleChoice: "Multiple choice",
  numericalEntry: "Numerical entry",
  textEntry: "Text Entry",
} satisfies Record<BasicFunctionTypes, string>;

const CreateBasicFunction: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [basicFunction, setBasicFunction] =
    useState<SpecifiedBasicFunctionModel | null>(null);
  const [basicFunctions, setBasicFunctions] = useState<
    SpecifiedBasicFunctionModel[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const { productionOrderId, basicFunctionId } = useParams();
  const navigate = useNavigate();

  const isEditMode = basicFunctionId !== "new";

  useEffect(() => {
    const fetchBasicFunction = async () => {
      const response = await axios.get(
        `${serverUrl}/production-order/${productionOrderId}/basic-function/${basicFunctionId}`
      );
      console.log("fetchBasicFunction, response.data:", response.data);
      setBasicFunction(response.data);
    };
    const fetchBasicFunctions = async () => {
      const response = await axios.get(
        `${serverUrl}/production-order/${productionOrderId}/basic-functions`
      );
      setBasicFunctions(response.data);
    };

    const fetchData = async () => {
      if (isEditMode) {
        await fetchBasicFunction();
      }
      await fetchBasicFunctions();
    };

    fetchData();
  }, [productionOrderId, isEditMode]);

  const getEmptyBasicFunction = (
    type: BasicFunctionTypes
  ): SpecifiedBasicFunctionModel => {
    switch (type) {
      case "multipleChoice":
        return {
          productionOrderId: productionOrderId as string,
          basicFunctionId: "new",
          name: "",
          type,
          prompt: "",
          options: [],
          prerequisites: [],
          isComplete: false,
          isSuccess: false,
          selectedOption: null,
          isUnlocked: true,
          missingPrerequisites: [],
        };
      case "numericalEntry":
        return {
          productionOrderId: productionOrderId as string,
          basicFunctionId: "new",
          name: "",
          type,
          entry: null,
          prerequisites: [],
          isComplete: false,
          isSuccess: false,
          isUnlocked: true,
          missingPrerequisites: [],
        };
      case "textEntry":
        return {
          productionOrderId: productionOrderId as string,
          basicFunctionId: "new",
          name: "",
          type,
          prompt: "",
          prerequisites: [],
          isComplete: false,
          isSuccess: false,
          isUnlocked: true,
          missingPrerequisites: [],
        };
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "type") {
      setBasicFunction(
        getEmptyBasicFunction(e.target.value as BasicFunctionTypes)
      );
    } else if (basicFunction !== null) {
      setBasicFunction({ ...basicFunction, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.post(`${serverUrl}/basic-function/edit`, {
          basicFunction,
        });
      } else {
        await axios.post(`${serverUrl}/basic-function/new`, {
          basicFunction,
        });
      }
      navigate(-1);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
      }
    }
  };

  const specifiedBasicFunctionForm = () => {
    switch (basicFunction?.type) {
      case "multipleChoice":
        return (
          <CreateBfMultipleChoice
            basicFunction={basicFunction}
            setBasicFunction={
              setBasicFunction as React.Dispatch<
                React.SetStateAction<MultipleChoiceModel>
              >
            }
            handleChange={handleChange}
          />
        );
      case "numericalEntry":
        return (
          <CreateBfNumericalEntry
            basicFunction={basicFunction}
            handleChange={handleChange}
            setBasicFunction={
              setBasicFunction as React.Dispatch<
                SetStateAction<SpecifiedBasicFunctionModel>
              >
            }
          />
        );
      case "textEntry":
        return (
          <CreateBfTextEntry
            basicFunction={basicFunction}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-5">
      <select
        name="type"
        value={basicFunction?.type ?? ""}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 flex-shrink-0 text-lg border border-gray-200 rounded-lg mb-4 mt-2 shadow-sm pl-3 focus:outline-none"
      >
        <option value="" disabled>
          Select basic function type
        </option>
        {basicFunctionTypes.map((type: BasicFunctionTypes) => (
          <option key={type} value={type}>
            {basicFunctionLabels[type]}
          </option>
        ))}
      </select>

      {specifiedBasicFunctionForm()}

      {error && (
        <div className="h-12 w-3/10 text-md border border-gray-200 rounded-lg shadow-md pl-3 bg-red-100 text-red-700 flex items-center justify-center">
          {error}
        </div>
      )}
      {basicFunction && (
        <CreatePrerequisites
          basicFunction={basicFunction}
          setBasicFunction={setBasicFunction}
          basicFunctions={basicFunctions}
        />
      )}

      <button
        className="h-12 w-3/10 flex-shrink-0 font-bold text-xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg my-4 cursor-pointer shadow-sm"
        onClick={handleSubmit}
      >
        Create Basic Function
      </button>
    </div>
  );
};

export default CreateBasicFunction;
