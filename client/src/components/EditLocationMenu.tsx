import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { LocationModel } from "./LocationList";
import type { ProcessUnitModel } from "./ProcessUnitList";
import axios from "axios";
import ProcessUnitBox from "./ProcessUnitBox";

const EditLocationMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { organisationId, locationId } = useParams();
  const [location, setLocation] = useState<LocationModel | null>(null);
  const [processUnits, setProcessUnits] = useState<ProcessUnitModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [organisationId, locationId]);

  const fetchData = async () => {
    await fetchLocation();
    await fetchProcessUnits();
  };

  const fetchLocation = async () => {
    const response = await axios.get(
      `${serverUrl}/org/${organisationId}/location/${locationId}`
    );
    if (response.status === 200) {
      setLocation(response.data.Item);
    }
  };

  const fetchProcessUnits = async () => {
    const response = await axios.get(
      `${serverUrl}/location/${locationId}/process-units`
    );
    if (response.status === 200) {
      setProcessUnits(response.data);
    }
  };

  const goToEditProcessUnit = async (processUnit: ProcessUnitModel) => {
    navigate(`process-unit/${processUnit.processUnitId}`);
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
                handleClick={goToEditProcessUnit}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditLocationMenu;
