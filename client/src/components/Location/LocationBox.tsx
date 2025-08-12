import type { LocationModel } from "./LocationList";

interface LocationBoxProps {
  location: LocationModel;
  handleClick: (location: LocationModel) => void;
}

const LocationBox: React.FC<LocationBoxProps> = ({ location, handleClick }) => {
  return (
    <div
      className="h-16 w-6/10 mt-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(location)}
    >
      <div className="font-bold">{location.name}</div>
    </div>
  );
};

export default LocationBox;
