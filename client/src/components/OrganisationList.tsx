import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import OrgBox from "./OrganisationBox";

export interface OrganisationModel {
  id: string;
  name: string;
}

const OrganisationList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { user } = useAuth();
  const [organisations, setOrganisations] = useState<OrganisationModel[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const orgs: OrganisationModel[] = [];
    for (const accessObject of user?.access || []) {
      const organisation = await fetchOrganisation(accessObject.organisationId);
      orgs.push(organisation);
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

  return (
    <div className="w-full h-full">
      {organisations && (
        <div className="mt-15 w-full flex flex-col items-center">
          {organisations.map((org) => {
            return <OrgBox key={org.id} organisation={org} />;
          })}
        </div>
      )}
    </div>
  );
};

export default OrganisationList;
