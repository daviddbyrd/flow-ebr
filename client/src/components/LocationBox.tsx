import type { LocationModel } from "./LocationList";
import { useNavigate } from "react-router-dom";

interface LocationBoxProps {
  location: LocationModel;
}

const LocationBox: React.FC<LocationBoxProps> = ({ location }) => {
  const navigate = useNavigate();

  const goToLocation = () => {
    navigate(`${location.locationId}`);
  };

  return (
    <div
      className="h-32 w-80 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={goToLocation}
    >
      <div className="font-bold">{location.name}</div>
    </div>
  );
};

export default LocationBox;
