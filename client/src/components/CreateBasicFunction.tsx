import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const basicFunctionTypes = ["multipleChoice", "numericalEntry", "textEntry"];

type BasicFunctionTypes = (typeof basicFunctionTypes)[number];

interface BasicFunctionModel {
  name: string;
  type: BasicFunctionTypes | null;
}

const basicFunctionTypeOptions = [
  { value: "multipleChoice", label: "Multiple choice" },
  { value: "numericalEntry", label: "Numerical entry" },
  { value: "textEntry", label: "Text entry" },
];

const emptyInfo: BasicFunctionModel = {
  name: "",
  type: null,
};

const CreateBasicFunction: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [info, setInfo] = useState<BasicFunctionModel>(emptyInfo);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(info);
  }, [info]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${serverUrl}/production-order`, info);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Select
        placeholder="Select basic function type"
        name="type"
        value={info.type}
        options={basicFunctionTypeOptions}
        onChange={(selectedOption) =>
          setInfo({ ...info, type: selectedOption?.value ?? null })
        }
      />
      <input
        type="text"
        name="name"
        placeholder="Enter production order name"
        value={info.name}
        onChange={(e) => handleChange(e)}
        className="w-80 h-12 text-lg border border-gray-200 rounded-lg my-8 shadow-sm pl-3 focus:outline-none"
      />
      {error && (
        <div className="w-80 h-12 text-md border border-gray-200 rounded-lg shadow-md pl-3 bg-red-100 text-red-700 flex items-center justify-center">
          {error}
        </div>
      )}
      <button
        className="w-80 h-12 font-bold text-xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg my-8 cursor-pointer shadow-sm"
        onClick={handleSubmit}
      >
        Create Production Order
      </button>
    </div>
  );
};

export default CreateBasicFunction;
