import { useParams } from "react-router-dom";
import LocationBox from "./LocationBox";
import { useEffect, useState } from "react";
import type { LocationModel } from "./LocationList";
import axios from "axios";

const Location: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { organisationId } = useParams();
  const [location, setLocation] = useState<LocationModel | null>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${serverUrl}/org/${organisationId}`);
    if (response.status === 200) {
      setLocation(response.data.Item);
    }
  };

  return <>{location && <LocationBox location={location} />}</>;
};

export default Location;
