import type { SpecifiedBasicFunctionModel } from "../CreateEdit/CreateBasicFunction";
import { useState } from "react";
import BfMultipleChoiceBox from "./BfMultipleChoiceBox";
import type { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

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
          className={classNames(
            "flex flex-col w-6/10 items-center m-5 p-5 border border-gray-200 rounded-md cursor-pointer",
            {
              "bg-green-200": basicFunction.isSuccess,
              "bg-red-200":
                basicFunction.isComplete && !basicFunction.isSuccess,
              "bg-yellow-100": !basicFunction.isUnlocked,
            }
          )}
          onClick={() => {
            setIsExpanded(false);
          }}
        >
          <div className="flex flex-row w-full items-center justify-between">
            <div className="font-bold">{basicFunction.name}</div>
            <div className="flex items-center justify-center h-16 w-16">
              {!basicFunction.isUnlocked && (
                <span className="text-2xl">🔒</span>
              )}
              {basicFunction.isSuccess && <span className="text-2xl">✅</span>}
              {basicFunction.isComplete && !basicFunction.isSuccess && (
                <span className="text-2xl">❌</span>
              )}
              {basicFunction.isUnlocked && !basicFunction.isComplete && (
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
          className={classNames(
            "flex flex-row items-center h-20 w-6/10 m-5 p-5 border border-gray-200 rounded-md hover:brightness-90 cursor-pointer",
            {
              "bg-green-200": basicFunction.isSuccess,
              "bg-red-200":
                basicFunction.isComplete && !basicFunction.isSuccess,
              "bg-yellow-100": !basicFunction.isUnlocked,
            }
          )}
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          <div className="font-bold">{basicFunction.name}</div>
          <div className="flex items-center justify-center h-16 w-16 ml-auto">
            {!basicFunction.isUnlocked && <span className="text-2xl">🔒</span>}
            {basicFunction.isSuccess && <span className="text-2xl">✅</span>}
            {basicFunction.isComplete && !basicFunction.isSuccess && (
              <span className="text-2xl">❌</span>
            )}
            {basicFunction.isUnlocked && !basicFunction.isComplete && (
              <span className="text-2xl">⚪️</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExecuteBasicFunctionBox;
