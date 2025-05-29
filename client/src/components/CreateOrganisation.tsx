import { useState } from "react";

const CreateOrganisation: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <input
        type="text"
        name="name"
        placeholder="Enter organisation name"
        value={name}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-8 shadow-sm pl-3 focus:outline-none"
      />
      <button
        className="w-80 h-12 font-bold text-xl border border-gray-200 bg-green-200 hover:bg-green-300 rounded-lg my-8 cursor-pointer shadow-sm"
        onClick={handleSubmit}
      >
        Create Organisation
      </button>
    </div>
  );
};

export default CreateOrganisation;
