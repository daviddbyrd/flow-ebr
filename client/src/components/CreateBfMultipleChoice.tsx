import type { MultipleChoiceModel } from "./CreateBasicFunction";

interface CreateBfMultipleChoiceProps {
  info: MultipleChoiceModel;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CreateBfMultipleChoice: React.FC<CreateBfMultipleChoiceProps> = ({
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
        value={info.name}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-4 shadow-sm pl-3 focus:outline-none"
      />
    </>
  );
};

export default CreateBfMultipleChoice;
