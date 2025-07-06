import type { NumericalEntryModel } from "./CreateBasicFunction";

interface CreateBfNumericalEntryProps {
  info: NumericalEntryModel;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateBfNumericalEntry: React.FC<CreateBfNumericalEntryProps> = ({
  info,
  handleChange,
}) => {
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Basic function name"
        value={info.name}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="prompt"
        placeholder="Prompt"
        value={info.prompt}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="min"
        placeholder="Min value"
        value={info.min}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="max"
        placeholder="Max value"
        value={info.max}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
    </>
  );
};

export default CreateBfNumericalEntry;
