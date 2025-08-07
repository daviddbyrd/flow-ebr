import type {
  MultipleChoiceModel,
  SpecifiedBasicFunctionModel,
} from "./BasicFunctionList";
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
    <div className="flex flex-col">
      {basicFunction.options.map((option, ind) => {
        return (
          <div>
            <ExecuteOptionBox
              key={ind}
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
