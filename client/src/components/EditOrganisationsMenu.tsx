import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import type { OrganisationModel } from "./OrganisationList";
import axios from "axios";
import OrganisationBox from "./OrganisationBox";
import { useNavigate } from "react-router-dom";

const EditOrganisationsMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const goToEditOrganisation = (organisation: OrganisationModel) => {
    navigate(`${organisation.organisationId}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <button
        className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer"
        onClick={() => navigate("new")}
      >
        Create New Organisation +
      </button>
      {organisations && (
        <div className="w-full flex flex-col items-center">
          {organisations.map((org) => {
            return (
              <OrganisationBox
                key={org.organisationId}
                organisation={org}
                handleClick={goToEditOrganisation}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EditOrganisationsMenu;
