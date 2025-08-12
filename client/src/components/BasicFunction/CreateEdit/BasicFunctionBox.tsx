import type { BasicFunctionModel } from "../../ProductionOrder/EditProductionOrderMenu";

interface BasicFunctionBoxProps {
  basicFunction: BasicFunctionModel;
  handleClick: (basicFunction: BasicFunctionModel) => void;
}

const BasicFunctionBox: React.FC<BasicFunctionBoxProps> = ({
  basicFunction,
  handleClick,
}) => {
  return (
    <div
      className="h-16 w-6/10 mt-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(basicFunction)}
    >
      <div className="font-bold">{basicFunction.name}</div>
    </div>
  );
};

export default BasicFunctionBox;
