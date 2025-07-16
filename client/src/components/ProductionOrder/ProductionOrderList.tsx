import { useEffect, useState } from "react";
import axios from "axios";
import ProductionOrderBox from "./ProductionOrderBox";
import { useParams, useNavigate } from "react-router-dom";

export interface ProductionOrderModel {
  productionOrderId: string;
  name: string;
}

const ProductionOrderList: React.FC = () => {
  console.log("hello");
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { processUnitId } = useParams();
  const [productionOrders, setProductionOrders] = useState<
    ProductionOrderModel[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("hello");
    const response = await axios.get(
      `${serverUrl}/process-units/${processUnitId}/production-orders`
    );
    console.log(response);
    if (response.status === 200) {
      setProductionOrders(response.data);
    }
  };

  const goToProductionOrder = (productionOrder: ProductionOrderModel) => {
    navigate(`${productionOrder.productionOrderId}/production-order`);
  };

  return (
    <div className="w-full h-full">
      {productionOrders && (
        <div className="w-full flex flex-col items-center">
          {productionOrders.map((productionOrder) => {
            return (
              <ProductionOrderBox
                key={productionOrder.productionOrderId}
                productionOrder={productionOrder}
                handleClick={goToProductionOrder}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductionOrderList;
