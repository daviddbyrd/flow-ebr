import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateProductionOrder: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { organisationId, locationId, processUnitId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${serverUrl}/production-order`, {
        name,
        processUnitId,
      });
      if (response.data.productionOrderId) {
        navigate(
          `/home/edit/organisation/${organisationId}/location/${locationId}/process-unit/${processUnitId}/production-order/${response.data.productionOrderId}`
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <input
        type="text"
        name="name"
        placeholder="Enter production order name"
        value={name}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg mt-8 shadow-sm pl-3 focus:outline-none"
      />
      {error && (
        <div className="h-12 w-3/10 text-md border border-gray-200 rounded-lg shadow-md pl-3 bg-red-100 text-red-700 flex items-center justify-center">
          {error}
        </div>
      )}
      <button
        className="h-12 w-3/10 font-bold text-xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg mt-8 cursor-pointer shadow-sm"
        onClick={handleSubmit}
      >
        Create Production Order
      </button>
    </div>
  );
};

export default CreateProductionOrder;
