import type { OptionModel } from "../../CreateEdit/CreateBasicFunction";

interface ExecuteOptionsBoxProps {
  option: OptionModel;
  selectedOption: string | null;
  setSelectedOption: (selectedOption: string | null) => void;
  isUnlocked: boolean;
}

const ExecuteOptionBox: React.FC<ExecuteOptionsBoxProps> = ({
  isUnlocked,
  option,
  selectedOption,
  setSelectedOption,
}) => {
  const handleChange = () => {
    if (!isUnlocked) {
      return;
    }
    if (option.name === selectedOption) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option.name);
    }
  };

  return (
    <div
      className={`w-full h-16 rounded-lg border border-gray-200 bg-white flex flex-row items-center justify-start my-2 ${
        selectedOption === option.name && "bg-gray-100"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="ml-5">{option.name}</div>
      <input
        className="w-8 h-8 mr-4 ml-auto peer"
        type="checkbox"
        checked={selectedOption === option.name}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExecuteOptionBox;
