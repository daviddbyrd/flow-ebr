import { useEffect, useState } from "react";
import axios from "axios";
import ProcessUnitBox from "./ProcessUnitBox";
import { useParams } from "react-router-dom";

export interface ProcessUnitModel {
  processUnitId: string;
  name: string;
}

const ProcessUnitList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { locationId } = useParams();
  const [processUnits, setProcessUnits] = useState<ProcessUnitModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `${serverUrl}/location/${locationId}/process-units`
    );
    console.log(response);
    if (response.status === 200) {
      setProcessUnits(response.data);
    }
  };

  return (
    <div className="w-full h-full">
      {processUnits && (
        <div className="mt-15 w-full flex flex-col items-center">
          {processUnits.map((processUnit) => {
            return (
              <ProcessUnitBox
                key={processUnit.processUnitId}
                processUnit={processUnit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProcessUnitList;
