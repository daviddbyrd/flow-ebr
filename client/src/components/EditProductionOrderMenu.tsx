import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BasicFunctionBox from "./BasicFunctionBox";
import type { ProductionOrderModel } from "./EditProcessUnitMenu";

export interface BasicFunctionModel {
  basicFunctionId: string;
  name: string;
}

const EditProductionOrderMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { processUnitId, productionOrderId } = useParams();
  const [productionOrder, setProductionOrder] =
    useState<ProductionOrderModel | null>(null);
  const [basicFunctions, setBasicFunctions] = useState<BasicFunctionModel[]>(
    []
  );

  useEffect(() => {
    fetchData();
  }, [processUnitId, productionOrderId]);

  const fetchData = async () => {
    await fetchProductionOrder();
    await fetchBasicFunctions();
  };

  const fetchProductionOrder = async () => {
    const response = await axios.get(
      `${serverUrl}/process-unit/${processUnitId}/production-order/${productionOrderId}`
    );
    console.log(response);
    if (response.status === 200) {
      setProductionOrder(response.data);
    }
  };

  const fetchBasicFunctions = async () => {
    const response = await axios.get(
      `${serverUrl}/production-order/${productionOrderId}/basic-functions`
    );
    console.log(response);
    if (response.status === 200) {
      setBasicFunctions(response.data);
    }
  };

  const goToEditBasicFunction = async (basicFunction: BasicFunctionModel) => {
    navigate(`basic-function/${basicFunction.basicFunctionId}`);
  };

  return (
    <div className="w-full h-full">
      {basicFunctions && (
        <div className="mt-15 w-full flex flex-col items-center">
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
