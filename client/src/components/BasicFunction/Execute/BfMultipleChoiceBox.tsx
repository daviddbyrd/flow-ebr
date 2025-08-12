import type {
  MultipleChoiceModel,
  SpecifiedBasicFunctionModel,
} from "../CreateEdit/CreateBasicFunction";
import ExecuteOptionBox from "./ExecuteOptionBox";

interface BasicFunctionBoxProps {
  basicFunction: MultipleChoiceModel;
  setBasicFunction: (newBasicFunction: SpecifiedBasicFunctionModel) => void;
}

const BfMultipleChoiceBox: React.FC<BasicFunctionBoxProps> = ({
  basicFunction,
  setBasicFunction,
}) => {
  const setSelectedOption = (selectedOption: string | null) => {
    setBasicFunction({ ...basicFunction, selectedOption: selectedOption });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="text-xl">{basicFunction.prompt}</div>
      {basicFunction.options.map((option, ind) => {
        return (
          <div className="w-8/10">
            <ExecuteOptionBox
              key={ind}
              isUnlocked={basicFunction.isUnlocked}
              option={option}
              selectedOption={basicFunction.selectedOption}
              setSelectedOption={setSelectedOption}
            ></ExecuteOptionBox>
          </div>
        );
      })}
    </div>
  );
};

export default BfMultipleChoiceBox;
