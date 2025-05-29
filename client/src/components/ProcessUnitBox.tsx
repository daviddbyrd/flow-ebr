import type { ProcessUnitModel } from "./ProcessUnitList";
import { useNavigate } from "react-router-dom";

interface ProcessUnitBoxProps {
  processUnit: ProcessUnitModel;
}

const ProcessUnitBox: React.FC<ProcessUnitBoxProps> = ({ processUnit }) => {
  const navigate = useNavigate();

  const goToProcessUnit = () => {
    navigate(`${processUnit.processUnitId}/location`);
  };

  return (
    <div
      className="h-32 w-80 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={goToProcessUnit}
    >
      <div className="font-bold">{processUnit.name}</div>
    </div>
  );
};

export default ProcessUnitBox;
