import { Outlet } from "react-router-dom";

const ProductionOrders: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default ProductionOrders;
