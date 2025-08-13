import type {
  NumericalEntryModel,
  SpecifiedBasicFunctionModel,
} from "../CreateBasicFunction";
import type { SetStateAction } from "react";

interface CreateBfNumericalEntryProps {
  basicFunction: NumericalEntryModel;
  setBasicFunction: React.Dispatch<SetStateAction<SpecifiedBasicFunctionModel>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateBfNumericalEntry: React.FC<CreateBfNumericalEntryProps> = ({
  basicFunction,
  setBasicFunction,
  handleChange,
}) => {
  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value === "" ? null : Number(value);
    console.log(parsedValue);
    if (!Number.isNaN(parsedValue)) {
      setBasicFunction((prev) => ({ ...prev, [e.target.name]: parsedValue }));
    }
  };

  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Basic function name"
        value={basicFunction.name}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="prompt"
        placeholder="Prompt"
        value={basicFunction.prompt}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="min"
        placeholder="Min value"
        value={basicFunction.min}
        onChange={(e) => handleChangeNumber(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="max"
        placeholder="Max value"
        value={basicFunction.max}
        onChange={(e) => handleChangeNumber(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg mt-5 shadow-sm pl-3 focus:outline-none"
      />
    </>
  );
};

export default CreateBfNumericalEntry;
