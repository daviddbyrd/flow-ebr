import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateLocation: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { organisationId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("route:", `${serverUrl}/location`);
      const response = await axios.post(`${serverUrl}/location`, {
        name: name,
        organisationId: organisationId,
      });
      if (response.data.locationId) {
        navigate(
          `/home/edit/organisation/${organisationId}/location/${response.data.locationId}`
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <input
        type="text"
        name="name"
        placeholder="Enter location name"
        value={name}
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
        Create Location
      </button>
    </div>
  );
};

export default CreateLocation;
