import { useEffect, useState } from "react";
import axios from "axios";
import ProcessUnitBox from "./ProcessUnitBox";
import { useParams, useNavigate } from "react-router-dom";

export interface ProcessUnitModel {
  processUnitId: string;
  name: string;
}

const ProcessUnitList: React.FC = () => {
  console.log("hello");
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [processUnits, setProcessUnits] = useState<ProcessUnitModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("hello");
    const response = await axios.get(
      `${serverUrl}/location/${locationId}/process-units`
    );
    console.log(response);
    if (response.status === 200) {
      setProcessUnits(response.data);
    }
  };

  const goToProcessUnit = (processUnit: ProcessUnitModel) => {
    navigate(`${processUnit.processUnitId}/production-order`);
  };

  return (
    <div className="w-full h-full">
      {processUnits && (
        <div className="w-full flex flex-col items-center">
          {processUnits.map((processUnit) => {
            return (
              <ProcessUnitBox
                key={processUnit.processUnitId}
                processUnit={processUnit}
                handleClick={goToProcessUnit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProcessUnitList;
