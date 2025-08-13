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
    const response = await axios.post(`${serverUrl}/basic-function/update`, {
      basicFunction: newBasicFunction,
    });
    console.log("response to handleSubmit;", response);
    if (response.status === 200) {
      setBasicFunctions(response.data);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start">
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
      <div className="h-20"></div>
    </div>
  );
};

export default BasicFunctionList;
