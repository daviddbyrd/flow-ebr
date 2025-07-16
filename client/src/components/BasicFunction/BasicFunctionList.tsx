import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BasicFunctionBox from "../BasicFunction/BasicFunctionBox";

export interface BasicFunctionModel {
  basicFunctionId: string;
  name: string;
}

const BasicFunctionList: React.FC = () => {
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {basicFunctions && (
        <div className="w-full flex flex-col items-center">
          {basicFunctions.map((basicFunction) => {
            return (
              <BasicFunctionBox
                key={basicFunction.basicFunctionId}
                basicFunction={basicFunction}
                handleClick={() => {}}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BasicFunctionList;
