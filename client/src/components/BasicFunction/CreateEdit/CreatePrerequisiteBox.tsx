import { AiOutlineClose } from "react-icons/ai";

interface CreatePrerequisiteBoxProps {
  prerequisite: string;
  removePrerequisite: (prerequisite: string) => void;
}

const CreatePrerequisiteBox: React.FC<CreatePrerequisiteBoxProps> = ({
  prerequisite,
  removePrerequisite,
}) => {
  return (
    <div className="h-12 w-3/10 flex-shrink-0 rounded-lg border border-gray-200 flex flex-row items-center justify-start my-2">
      <div className="ml-5 text-lg">{prerequisite}</div>
      <button
        className="h-10 w-10 flex items-center justify-center mr-2 cursor-pointer hover:bg-red-100 rounded-lg ml-auto"
        onClick={() => removePrerequisite(prerequisite)}
      >
        <AiOutlineClose className="text-red-600" size={20} />
      </button>
    </div>
  );
};

export default CreatePrerequisiteBox;
