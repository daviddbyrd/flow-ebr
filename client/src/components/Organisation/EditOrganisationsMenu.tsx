import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import OrganisationBox from "./OrganisationBox";
import { useNavigate, useLocation } from "react-router-dom";

export interface AccessModel {
  organisationId: string;
  role: "admin" | "user";
}

export interface OrganisationModel {
  organisationId: string;
  name: string;
}

const EditOrganisationsMenu: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const { userId } = useAuth();
  const [access, setAccess] = useState<AccessModel[]>([]);
  const navigate = useNavigate();
  const [organisations, setOrganisations] = useState<OrganisationModel[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.refresh) {
      fetchUser();
    }
  }, [location.state]);

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
    console.log("orgs", orgs);
    console.log("access object:", access);
    setOrganisations(orgs);
  };

  const fetchOrganisation = async (id: string) => {
    console.log("fetchOrganisation started");
    const response = await axios.get(`${serverUrl}/org/${id}`);
    console.log("fetchOrganisation response:", response);
    if (response.status === 200) {
      return response.data;
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
        className="w-80 h-16 border border-gray-200 mt-8 font-bold text-xl rounded-md bg-green-300 hover:bg-green-400 cursor-pointer flex-shrink-0"
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
