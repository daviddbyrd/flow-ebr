import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import OrgBox from "./OrganisationBox";
import { useNavigate } from "react-router-dom";
import type { AccessModel, OrganisationModel } from "./EditOrganisationsMenu";

const OrganisationList: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [access, setAccess] = useState<AccessModel[]>([]);
  const [organisations, setOrganisations] = useState<OrganisationModel[]>([]);

  console.log("hello");

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (access) {
      fetchOrganisations();
    }
  }, [access]);

  const fetchUser = async () => {
    console.log("fetchUser started");
    const response = await axios.get(`${serverUrl}/user/${userId}/access`);
    console.log("fetchUser response:", response);
    if (response.status === 200) {
      setAccess(response.data);
    }
  };

  const fetchOrganisations = async () => {
    const orgs: OrganisationModel[] = [];
    console.log("access:", access);
    for (const accessObject of access || []) {
      const organisation = await fetchOrganisation(accessObject.organisationId);
      if (organisation) {
        orgs.push(organisation);
      }
    }
    setOrganisations(orgs);
  };

  const fetchOrganisation = async (id: string) => {
    console.log("fetchOrganisation started");
    const response = await axios.get(`${serverUrl}/org/${id}`);
    console.log("fetchOrganisation response:", response);
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
