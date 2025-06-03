import { useState } from "react";
import type { SetStateAction } from "react";
import CreateOptionBox from "./CreateOptionBox";
import type { OptionModel } from "./CreateBasicFunction";

interface CreateOptionsProps {
  options: OptionModel[];
  setOptions: React.Dispatch<SetStateAction<OptionModel[]>>;
}

const CreateOptions: React.FC<CreateOptionsProps> = ({
  options,
  setOptions,
}) => {
  const [newOption, setNewOption] = useState<OptionModel>({
    name: "",
    isSuccess: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <>
      <div className="w-80 h-12 flex flex-row justify-between my-4">
        <input
          onChange={(e) => handleChange(e)}
          className="w-60 h-12 text-lg border border-gray-200 rounded-lg shadow-sm pl-3 focus:outline-none"
        />
        <button
          className="w-16 h-12 font-bold text-md border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg cursor-pointer shadow-sm"
          onClick={() => setOptions([...options, newOption])}
        >
          + Add
        </button>
      </div>
      {options.map((option) => {
        return (
          <CreateOptionBox
            option={option}
            options={options}
            setOptions={setOptions}
          ></CreateOptionBox>
        );
      })}
    </>
  );
};

export default CreateOptions;
