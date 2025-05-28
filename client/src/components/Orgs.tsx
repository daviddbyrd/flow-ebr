import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface OrganisationModel {
  id: string;
  name: string;
}

const Orgs: React.FC = () => {
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
    const response = await axios.get(`http://localhost:3000/org/${id}`);
    if (response.status === 200) {
      return response.data.Item;
    } else {
      return null;
    }
  };

  return (
    <div className="w-full h-full">
      {organisations && (
        <div className="mt-20">{JSON.stringify(organisations)}</div>
      )}
      <Outlet />
    </div>
  );
};

export default Orgs;
