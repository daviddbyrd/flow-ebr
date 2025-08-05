import type { TextEntryModel } from "./createEdit/CreateBasicFunction";

interface CreateBfTextEntryProps {
  info: TextEntryModel;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateBfTextEntry: React.FC<CreateBfTextEntryProps> = ({
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
    </>
  );
};

export default CreateBfTextEntry;
