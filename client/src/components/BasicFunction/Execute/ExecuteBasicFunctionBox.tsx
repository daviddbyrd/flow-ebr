import type {
  SpecifiedBasicFunctionModel,
  MultipleChoiceModel,
  TextEntryModel,
  NumericalEntryModel,
} from "./BasicFunctionList";
import { useState } from "react";
import BfMultipleChoiceBox from "./BfMultipleChoiceBox";
import type { Dispatch, SetStateAction } from "react";

interface BfMultipleChoiceBoxProps {
  basicFunction: SpecifiedBasicFunctionModel;
  setBasicFunctions: Dispatch<SetStateAction<SpecifiedBasicFunctionModel[]>>;
  handleSubmit: (newBasicFunction: SpecifiedBasicFunctionModel) => void;
}

const ExecuteBasicFunctionBox: React.FC<BfMultipleChoiceBoxProps> = ({
  basicFunction,
  setBasicFunctions,
  handleSubmit,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setBasicFunction = (newBasicFunction: SpecifiedBasicFunctionModel) => {
    setBasicFunctions((prevBasicFunctions) =>
      prevBasicFunctions.map((basicFunction) =>
        basicFunction.name === newBasicFunction.name
          ? newBasicFunction
          : basicFunction
      )
    );
  };

  const renderContent = () => {
    switch (basicFunction.type) {
      case "multipleChoice":
        return (
          <BfMultipleChoiceBox
            basicFunction={basicFunction}
            setBasicFunction={setBasicFunction}
          />
        );
    }
  };

  return (
    <>
      {isExpanded ? (
        <div
          className="flex flex-col items-center m-5 p-5 border border-gray-200 rounded-md  cursor-pointer"
          onClick={() => {
            setIsExpanded(false);
          }}
        >
          <div className="flex flex-row w-full items-center justify-between">
            <div className="font-bold">{basicFunction.name}</div>
            <div className="flex items-center justify-center h-16 w-16">
              {basicFunction.isSuccess && <span className="text-2xl">✅</span>}
              {basicFunction.isComplete && !basicFunction.isSuccess && (
                <span className="text-2xl">❌</span>
              )}
              {!basicFunction.isComplete && (
                <span className="text-2xl">⚪️</span>
              )}
            </div>
          </div>
          {renderContent()}
          <div className="flex flow-row w-full items-center justify-between pt-3">
            <button className="bg-red-300 h-12 w-20 rounded-md cursor-pointer">
              Cancel
            </button>
            <button
              className="bg-green-300 h-12 w-20 rounded-md cursor-pointer"
              onClick={() => handleSubmit(basicFunction)}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-row items-center h-20 w-80 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer 
            ${
              basicFunction.isSuccess
                ? "bg-green-200"
                : basicFunction.isComplete && "bg-red-200"
            }`}
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          <div className="font-bold">{basicFunction.name}</div>
          <div className="flex items-center justify-center h-16 w-16 ml-auto">
            {basicFunction.isSuccess && <span className="text-2xl">✅</span>}
            {basicFunction.isComplete && !basicFunction.isSuccess && (
              <span className="text-2xl">❌</span>
            )}
            {!basicFunction.isComplete && <span className="text-2xl">⚪️</span>}
          </div>
        </div>
      )}
    </>
  );
};

export default ExecuteBasicFunctionBox;
