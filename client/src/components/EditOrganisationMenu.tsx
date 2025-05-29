import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { OrganisationModel } from "./OrganisationList";
import type { LocationModel } from "./LocationList";
import axios from "axios";
import LocationBox from "./LocationBox";

const EditOrganisationMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { organisationId } = useParams();
  const [organisation, setOrganisation] = useState<OrganisationModel | null>(
    null
  );
  const [locations, setLocations] = useState<LocationModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [organisationId]);

  const fetchData = async () => {
    await fetchOrganisation();
    await fetchLocations();
  };

  const fetchOrganisation = async () => {
    const response = await axios.get(`${serverUrl}/org/${organisationId}`);
    if (response.status === 200) {
      setOrganisation(response.data.Item);
      return response.data.Item.organisationId;
    } else {
      return null;
    }
  };

  const fetchLocations = async () => {
    const response = await axios.get(
      `${serverUrl}/org/${organisationId}/locations`
    );
    console.log(response);
    if (response.status === 200) {
      setLocations(response.data);
    }
  };

  const goToEditLocation = async (location: LocationModel) => {
    navigate(`location/${location.locationId}`);
  };

  return (
    <div className="w-full h-full">
      {locations && (
        <div className="mt-15 w-full flex flex-col items-center">
          {locations.map((location) => {
            return (
              <LocationBox
                key={location.locationId}
                location={location}
                handleClick={goToEditLocation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditOrganisationMenu;
