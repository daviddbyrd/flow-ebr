import type { TextEntryModel } from "../CreateBasicFunction";

interface CreateBfTextEntryProps {
  basicFunction: TextEntryModel;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateBfTextEntry: React.FC<CreateBfTextEntryProps> = ({
  basicFunction,
  handleChange,
}) => {
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Basic function name"
        value={basicFunction.name}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
      <input
        type="text"
        name="prompt"
        placeholder="Prompt"
        value={basicFunction.prompt}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
    </>
  );
};

export default CreateBfTextEntry;
