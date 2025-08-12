import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ExecuteBasicFunctionBox from "./ExecuteBasicFunctionBox";
import type { SpecifiedBasicFunctionModel } from "../CreateEdit/CreateBasicFunction";

const BasicFunctionList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { processUnitId, productionOrderId } = useParams();
  const [basicFunctions, setBasicFunctions] = useState<
    SpecifiedBasicFunctionModel[]
  >([]);

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
    console.log("response:", response);
    if (response.status === 200) {
      setBasicFunctions(response.data);
    }
  };

  const handleSubmit = async (
    newBasicFunction: SpecifiedBasicFunctionModel
  ) => {
    console.log("submitted basic function: ", newBasicFunction);
    await axios.post(`${serverUrl}/basic-function/update`, {
      basicFunction: newBasicFunction,
    });
    fetchBasicFunctions();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {basicFunctions && (
        <div className="w-full flex flex-col items-center">
          {basicFunctions.map((basicFunction) => {
            return (
              <ExecuteBasicFunctionBox
                key={basicFunction.basicFunctionId}
                basicFunction={basicFunction}
                setBasicFunctions={setBasicFunctions}
                handleSubmit={handleSubmit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BasicFunctionList;
