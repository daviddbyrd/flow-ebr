import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import OrgBox from "./OrganisationBox";
import { useNavigate } from "react-router-dom";

export interface OrganisationModel {
  organisationId: string;
  name: string;
}

const OrganisationList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [organisations, setOrganisations] = useState<OrganisationModel[]>([]);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    const orgs: OrganisationModel[] = [];
    for (const accessObject of user?.access || []) {
      const organisation = await fetchOrganisation(accessObject.organisationId);
      if (organisation) {
        orgs.push(organisation);
      }
    }
    setOrganisations(orgs);
  };

  const fetchOrganisation = async (id: string) => {
    const response = await axios.get(`${serverUrl}/org/${id}`);
    if (response.status === 200) {
      return response.data.Item;
    } else {
      return null;
    }
  };

  const goToOrganisation = (organisation: OrganisationModel) => {
    navigate(`${organisation.organisationId}/location`);
  };

  return (
    <div className="w-full h-full">
      {organisations && (
        <div className="w-full flex flex-col items-center">
          {organisations.map((org) => {
            return (
              <OrgBox
                key={org.organisationId}
                organisation={org}
                handleClick={goToOrganisation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrganisationList;
