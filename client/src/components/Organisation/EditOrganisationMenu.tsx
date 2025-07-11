import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { OrganisationModel } from "./OrganisationList";
import type { LocationModel } from "../Location/LocationList";
import axios from "axios";
import LocationBox from "../Location/LocationBox";

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
    if (response.status === 200) {
      setLocations(response.data);
    }
  };

  const goToEditLocation = async (location: LocationModel) => {
    navigate(`location/${location.locationId}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <button
        className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer flex-shrink-0"
        onClick={() => navigate("location/new")}
      >
        Create New Location +
      </button>
      {locations && (
        <div className="w-full flex flex-col items-center">
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
