import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { OrganisationModel } from "./OrganisationList";
import type { ProcessUnitModel } from "./ProcessUnitList";
import axios from "axios";
import ProcessUnitBox from "./ProcessUnitBox";

const EditLocation: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { locationId } = useParams();
  const [location, setLocation] = useState<OrganisationModel | null>(null);
  const [processUnits, setProcessUnits] = useState<ProcessUnitModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [locationId]);

  const fetchData = async () => {
    const locationId = await fetchLocation();
    if (locationId) {
      await fetchProcessUnits(locationId);
    }
  };

  const fetchLocation = async () => {
    const response = await axios.get(`${serverUrl}/location/${locationId}`);
    if (response.status === 200) {
      setLocation(response.data.Item);
      return response.data.Item.locationId;
    } else {
      return null;
    }
  };

  const fetchProcessUnits = async (locationId: string) => {
    const response = await axios.get(
      `${serverUrl}/org/${locationId}/locations`
    );
    console.log(response);
    if (response.status === 200) {
      setProcessUnits(response.data);
    }
  };

  const goToEditProcessUnit = async (processUnit: ProcessUnitModel) => {
    navigate(`${processUnit.processUnitId}`);
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

export default EditLocation;
