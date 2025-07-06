import type { OrganisationModel } from "./OrganisationList";

interface OrganisationBoxProps {
  organisation: OrganisationModel;
  handleClick: (organisation: OrganisationModel) => void;
}

const OrganisationBox: React.FC<OrganisationBoxProps> = ({
  organisation,
  handleClick,
}) => {
  return (
    <div
      className="h-32 w-80 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(organisation)}
    >
      <div className="font-bold">{organisation.name}</div>
    </div>
  );
};

export default OrganisationBox;
