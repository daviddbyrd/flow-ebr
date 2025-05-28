import type { OrganisationModel } from "./OrganisationList";
import { useNavigate } from "react-router-dom";

interface OrganisationBoxProps {
  organisation: OrganisationModel;
}

const OrganisationBox: React.FC<OrganisationBoxProps> = ({ organisation }) => {
  const navigate = useNavigate();

  const goToOrganisation = () => {
    navigate(`${organisation.id}/location`);
  };

  return (
    <div
      className="h-32 w-80 m-5 p-5 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
      onClick={goToOrganisation}
    >
      <div className="font-bold">{organisation.name}</div>
    </div>
  );
};

export default OrganisationBox;
