import type { SpecifiedBasicFunctionModel } from "./CreateBasicFunction";

interface BasicFunctionBoxProps {
  basicFunction: SpecifiedBasicFunctionModel;
  handleClick: (basicFunction: SpecifiedBasicFunctionModel) => void;
  isReordering: boolean;
  setOrder: ({
    oldPosition,
    newPosition,
  }: {
    oldPosition: number;
    newPosition: number;
  }) => void;
  numFunctions: number;
}

const BasicFunctionBox: React.FC<BasicFunctionBoxProps> = ({
  basicFunction,
  handleClick,
  isReordering,
  setOrder,
  numFunctions,
}) => {
  return (
    <div
      className="h-16 w-3/5 mt-5 flex flex-row items-center p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(basicFunction)}
    >
      {isReordering && (
        <select
          value={basicFunction.position}
          onChange={(e) =>
            setOrder({
              oldPosition: basicFunction.position,
              newPosition: Number(e.target.value),
            })
          }
          className="h-10 w-10 flex items-center justify-center border-1 border-gray-100 rounded-md mr-5"
        >
          {Array.from({ length: numFunctions }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      )}
      <div className="font-bold">{basicFunction.name}</div>
    </div>
  );
};

export default BasicFunctionBox;
