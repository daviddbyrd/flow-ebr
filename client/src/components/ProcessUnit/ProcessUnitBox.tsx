import type { ProcessUnitModel } from "./ProcessUnitList";

interface ProcessUnitBoxProps {
  processUnit: ProcessUnitModel;
  handleClick: (processUnit: ProcessUnitModel) => void;
}

const ProcessUnitBox: React.FC<ProcessUnitBoxProps> = ({
  processUnit,
  handleClick,
}) => {
  return (
    <div
      className="h-16 w-6/10 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(processUnit)}
    >
      <div className="font-bold">{processUnit.name}</div>
    </div>
  );
};

export default ProcessUnitBox;
