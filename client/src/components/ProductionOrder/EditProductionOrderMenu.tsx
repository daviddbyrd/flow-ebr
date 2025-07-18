import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BasicFunctionBox from "../BasicFunction/BasicFunctionBox";

export interface BasicFunctionModel {
  basicFunctionId: string;
  name: string;
}

const EditProductionOrderMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { processUnitId, productionOrderId } = useParams();
  const [basicFunctions, setBasicFunctions] = useState<BasicFunctionModel[]>(
    []
  );

  useEffect(() => {
    fetchData();
  }, [processUnitId, productionOrderId]);

  const fetchData = async () => {
    await fetchBasicFunctions();
  };

  const fetchBasicFunctions = async () => {
    const response = await axios.get(
      `${serverUrl}/production-order/${productionOrderId}/basic-functions`
    );
    if (response.status === 200) {
      setBasicFunctions(response.data);
    }
  };

  const goToEditBasicFunction = async (basicFunction: BasicFunctionModel) => {
    navigate(`basic-function/${basicFunction.basicFunctionId}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <button
        className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer flex-shrink-0"
        onClick={() => navigate("basic-function/new")}
      >
        Create New Basic Function +
      </button>
      {basicFunctions && (
        <div className="w-full flex flex-col items-center">
          {basicFunctions.map((basicFunction) => {
            return (
              <BasicFunctionBox
                key={basicFunction.basicFunctionId}
                basicFunction={basicFunction}
                handleClick={goToEditBasicFunction}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditProductionOrderMenu;
