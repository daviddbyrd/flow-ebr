import type { OptionModel } from "./CreateBasicFunction";
import type { SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface CreateOptionsBoxProps {
  option: OptionModel;
  options: OptionModel[];
  setOptions: React.Dispatch<SetStateAction<OptionModel[]>>;
}

const CreateOptionBox: React.FC<CreateOptionsBoxProps> = ({
  option,
  options,
  setOptions,
}) => {
  const handleSuccessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = options.map((op) =>
      op.name == option.name ? { ...option, isSuccess: e.target.checked } : op
    );
    setOptions(newOptions);
  };

  return (
    <div
      className={`w-80 h-16 rounded-lg border border-gray-200 flex flex-row items-center justify-start my-2 ${
        option.isSuccess && "bg-green-100"
      }`}
    >
      <input
        className="w-8 h-8 ml-4 peer"
        type="checkbox"
        checked={option.isSuccess}
        onChange={handleSuccessChange}
      />
      <div className="ml-5">{option.name}</div>
      {option.isSuccess && (
        <div className="p-1 rounded-full h-10 w-20 bg-green-200 border border-green-400 flex items-center justify-center ml-auto">
          Success
        </div>
      )}
      <button
        className={`h-10 w-10 flex items-center justify-center ml-2 mr-4 cursor-pointer hover:bg-red-100 rounded-lg ${
          !option.isSuccess && "ml-auto"
        }`}
      >
        <AiOutlineClose className="text-red-600" size={20} />
      </button>
    </div>
  );
};

export default CreateOptionBox;
