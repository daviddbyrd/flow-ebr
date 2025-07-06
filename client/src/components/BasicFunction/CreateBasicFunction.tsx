import { useState, useEffect } from "react";
import axios from "axios";
import CreateBfMultipleChoice from "./CreateBfMultipleChoice";
import CreateBfNumericalEntry from "./CreateBfNumericalEntry";
import CreateBfTextEntry from "./CreateBfTextEntry";
import { useParams } from "react-router-dom";

const basicFunctionTypes = [
  "multipleChoice",
  "numericalEntry",
  "textEntry",
] as const;

type BasicFunctionTypes = (typeof basicFunctionTypes)[number];

interface BasicFunctionModel {
  name: string;
  prompt?: string;
  type: BasicFunctionTypes | null;
}

export interface OptionModel {
  name: string;
  isSuccess: boolean;
}

export interface MultipleChoiceModel extends BasicFunctionModel {
  type: "multipleChoice";
  options: OptionModel[];
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

const basicFunctionLabels = {
  multipleChoice: "Multiple choice",
  numericalEntry: "Numerical entry",
  textEntry: "Text Entry",
} satisfies Record<BasicFunctionTypes, string>;

const CreateBasicFunction: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [info, setInfo] = useState<SpecifiedBasicFunctionModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { productionOrderId } = useParams();

  useEffect(() => {
    console.log(info);
  }, [info]);

  const getEmptyInfo = (
    type: BasicFunctionTypes
  ): SpecifiedBasicFunctionModel => {
    switch (type) {
      case "multipleChoice":
        return { name: "", type, prompt: "", options: [] };
      case "numericalEntry":
        return { name: "", type };
      case "textEntry":
        return { name: "", type, prompt: "" };
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "type") {
      setInfo(getEmptyInfo(e.target.value));
    } else if (info !== null) {
      setInfo({ ...info, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      console.log(info);
      await axios.post(`${serverUrl}/basic-function`, {
        basicFunction: info,
        productionOrderId: productionOrderId,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
      }
    }
  };

  const specifiedBasicFunctionForm = () => {
    switch (info?.type) {
      case "multipleChoice":
        return (
          <CreateBfMultipleChoice
            info={info}
            setInfo={setInfo}
            handleChange={handleChange}
          />
        );
      case "numericalEntry":
        return (
          <CreateBfNumericalEntry info={info} handleChange={handleChange} />
        );
      case "textEntry":
        return <CreateBfTextEntry info={info} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-5">
      <div className="font-bold">Basic function type</div>
      <select
        name="type"
        value={info?.type ?? ""}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg mb-4 mt-2 shadow-sm pl-3 focus:outline-none"
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
        <div className="w-80 h-12 text-md border border-gray-200 rounded-lg shadow-md pl-3 bg-red-100 text-red-700 flex items-center justify-center">
          {error}
        </div>
      )}
      <button
        className="w-80 h-12 font-bold text-xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg my-4 cursor-pointer shadow-sm"
        onClick={handleSubmit}
      >
        Create Basic Function
      </button>
    </div>
  );
};

export default CreateBasicFunction;
