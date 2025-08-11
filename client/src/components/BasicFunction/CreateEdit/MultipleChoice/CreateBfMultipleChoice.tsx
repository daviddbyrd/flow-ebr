import type { MultipleChoiceModel } from "../CreateBasicFunction";
import CreateOptions from "./CreateOptions";
import type { OptionModel } from "../CreateBasicFunction";
import { useState, useEffect } from "react";
import type { SetStateAction } from "react";

interface CreateBfMultipleChoiceProps {
  basicFunction: MultipleChoiceModel;
  setBasicFunction: React.Dispatch<SetStateAction<MultipleChoiceModel>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateBfMultipleChoice: React.FC<CreateBfMultipleChoiceProps> = ({
  basicFunction,
  setBasicFunction,
  handleChange,
}) => {
  const setOptions = (options: OptionModel[]) => {
    setBasicFunction((prev) => ({ ...prev, options: options }));
  };

  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Basic function name"
        value={basicFunction.name}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="prompt"
        placeholder="Prompt"
        value={basicFunction.prompt}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
      <CreateOptions options={basicFunction.options} setOptions={setOptions} />
    </>
  );
};

export default CreateBfMultipleChoice;
