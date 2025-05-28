import { useEffect, useState } from "react";
import axios from "axios";
import LocationBox from "./LocationBox";
import { useParams } from "react-router-dom";

export interface LocationModel {
  locationId: string;
  name: string;
}

const LocationList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { organisationId } = useParams();
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `${serverUrl}/org/${organisationId}/locations`
    );
    console.log(response);
    if (response.status === 200) {
      setLocations(response.data);
    }
  };

  return (
    <div className="w-full h-full">
      {locations && (
        <div className="mt-15 w-full flex flex-col items-center">
          {locations.map((location) => {
            return (
              <LocationBox key={location.locationId} location={location} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationList;
