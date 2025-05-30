import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ProcessUnitModel } from "./ProcessUnitList";
import axios from "axios";
import ProductionOrderBox from "./ProductionOrderBox";

export interface ProductionOrderModel {
  productionOrderId: string;
  name: string;
}

const EditProcessUnitMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { locationId, processUnitId } = useParams();
  const [processUnit, setProcessUnit] = useState<ProcessUnitModel | null>(null);
  const [productionOrders, setProductionOrders] = useState<
    ProductionOrderModel[]
  >([]);

  useEffect(() => {
    fetchData();
  }, [locationId, processUnitId]);

  const fetchData = async () => {
    await fetchProcessUnit();
    await fetchProductionOrders();
  };

  const fetchProcessUnit = async () => {
    const response = await axios.get(
      `${serverUrl}/location/${locationId}/process-unit/${processUnitId}`
    );
    if (response.status === 200) {
      setProcessUnit(response.data);
    }
  };

  const fetchProductionOrders = async () => {
    const response = await axios.get(
      `${serverUrl}/process-unit/${processUnitId}/production-orders`
    );
    if (response.status === 200) {
      setProductionOrders(response.data);
    }
  };

  const goToEditProductionOrder = async (
    productionOrder: ProductionOrderModel
  ) => {
    navigate(`production-order/${productionOrder.productionOrderId}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <button
        className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer"
        onClick={() => navigate("production-order/new")}
      >
        Create New Production Order +
      </button>
      {productionOrders && (
        <div className="mt-15 w-full flex flex-col items-center">
          {productionOrders.map((productionOrder) => {
            return (
              <ProductionOrderBox
                key={productionOrder.productionOrderId}
                productionOrder={productionOrder}
                handleClick={goToEditProductionOrder}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditProcessUnitMenu;
