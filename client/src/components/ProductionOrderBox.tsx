import type { ProductionOrderModel } from "./EditProcessUnitMenu";

interface ProductionOrderBoxProps {
  productionOrder: ProductionOrderModel;
  handleClick: (processUnit: ProductionOrderModel) => void;
}

const ProductionOrderBox: React.FC<ProductionOrderBoxProps> = ({
  productionOrder,
  handleClick,
}) => {
  return (
    <div
      className="h-32 w-80 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(productionOrder)}
    >
      <div className="font-bold">{productionOrder.name}</div>
    </div>
  );
};

export default ProductionOrderBox;
