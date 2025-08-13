import type { OrganisationModel } from "./EditOrganisationsMenu";

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
      className="h-16 w-6/10 mt-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={() => handleClick(organisation)}
    >
      <div className="font-bold">{organisation.name}</div>
    </div>
  );
};

export default OrganisationBox;
