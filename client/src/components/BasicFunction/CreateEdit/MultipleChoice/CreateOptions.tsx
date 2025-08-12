import { useState } from "react";
import CreateOptionBox from "./CreateOptionBox";
import type { OptionModel } from "../CreateBasicFunction";

interface CreateOptionsProps {
  options: OptionModel[];
  setOptions: (options: OptionModel[]) => void;
}

const emptyOption = {
  name: "",
  isSuccess: false,
};

const CreateOptions: React.FC<CreateOptionsProps> = ({
  options,
  setOptions,
}) => {
  const [newOption, setNewOption] = useState<OptionModel>(emptyOption);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleAdd = () => {
    setOptions([...options, newOption]);
    setNewOption(emptyOption);
  };

  return (
    <>
      <div className="h-12 w-3/10 flex-shrink-0 flex flex-row justify-between my-4">
        <input
          onChange={(e) => handleChange(e)}
          className="h-12 w-6/10 text-lg border border-gray-200 rounded-lg shadow-sm pl-3 focus:outline-none"
          value={newOption.name}
          placeholder="Option"
        />
        <button
          className="h-12 w-3/10 font-bold text-md border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg cursor-pointer shadow-sm"
          onClick={() => handleAdd()}
        >
          + Add
        </button>
      </div>
      {options.map((option, ind) => {
        return (
          <CreateOptionBox
            key={ind}
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
