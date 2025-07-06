import { useEffect, useState } from "react";
import axios from "axios";
import LocationBox from "./LocationBox";
import { useParams, useNavigate } from "react-router-dom";

export interface LocationModel {
  locationId: string;
  name: string;
}

const LocationList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { organisationId } = useParams();
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [organisationId]);

  const fetchData = async () => {
    const response = await axios.get(
      `${serverUrl}/org/${organisationId}/locations`
    );
    if (response.status === 200) {
      setLocations(response.data);
    }
  };

  const goToLocation = (location: LocationModel) => {
    navigate(`${location.locationId}`);
  };

  return (
    <div className="w-full h-full">
      {locations && (
        <div className="w-full flex flex-col items-center">
          {locations.map((location) => {
            return (
              <LocationBox
                key={location.locationId}
                location={location}
                handleClick={goToLocation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationList;
