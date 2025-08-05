import type { OptionModel } from "./CreateBasicFunction";
import { AiOutlineClose } from "react-icons/ai";

interface ExecuteOptionsBoxProps {
  option: OptionModel;
  selectedOption: string | null;
  setSelectedOption: (selectedOption: string) => void;
}

const ExecuteOptionBox: React.FC<ExecuteOptionsBoxProps> = ({
  option,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div
      className={`w-80 h-16 rounded-lg border border-gray-200 flex flex-row items-center justify-start my-2 ${
        selectedOption === option.name && "bg-gray-100"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="ml-5">{option.name}</div>
      <input
        className="w-8 h-8 mr-4 ml-auto peer"
        type="checkbox"
        checked={selectedOption === option.name}
        onChange={() => setSelectedOption(option.name)}
      />
    </div>
  );
};

export default ExecuteOptionBox;
