import { useState, useEffect } from "react";
import type { OrganisationModel } from "./Organisation/EditOrganisationsMenu";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface AccessFormModel {
  username: string;
  organisationId: string;
  organisationName: string;
  role: "admin" | "user" | "";
}

export interface GrantAccessProps {
  username: string;
  organisationId: string;
  role: "admin" | "user" | "";
}

const emptyAccessForm: AccessFormModel = {
  username: "",
  organisationId: "",
  organisationName: "",
  role: "",
};

const Access: React.FC = () => {
  const serverUrl = import.meta.env.VITE_SERVER;
  const [accessForm, setAccessForm] =
    useState<AccessFormModel>(emptyAccessForm);
  const [error, setError] = useState<string | null>(null);
  const [organisations, setOrgnanisations] = useState<OrganisationModel[]>([]);
  const { userId } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAccessForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log("Access form: ", accessForm);
  }, [accessForm]);

  useEffect(() => {
    fetchOrganisations();
  }, [userId]);

  const fetchOrganisations = async () => {
    console.log("ran fetchOrganisations");
    const response = await axios.get(
      `${serverUrl}/user/${userId}/admin-organisations`
    );
    console.log("response: ", response);
    if (response.status === 200) {
      setOrgnanisations(response.data);
    }
  };

  const handleSubmit = async () => {
    try {
      await grantAccess({
        username: accessForm.username,
        organisationId: accessForm.organisationId,
        role: accessForm.role,
      });
      setAccessForm(emptyAccessForm);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
      }
    }
  };

  const grantAccess = async ({
    username,
    organisationId,
    role,
  }: GrantAccessProps) => {
    await axios.post(`${serverUrl}/user/grant-access`, {
      username,
      organisationId,
      role,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={accessForm.username}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 text-lg border border-gray-200 rounded-lg mt-8 shadow-sm pl-3 focus:outline-none"
      />
      <select
        name="organisationId"
        value={accessForm.organisationId}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 flex-shrink-0 text-lg border border-gray-200 rounded-lg mt-6 shadow-sm pl-3 focus:outline-none"
      >
        <option value="" disabled>
          Select Organisation
        </option>
        {organisations.map((organisation) => (
          <option
            key={organisation.organisationId}
            value={organisation.organisationId}
          >
            {organisation.name}
          </option>
        ))}
      </select>
      <select
        name="role"
        value={accessForm.role}
        onChange={(e) => handleChange(e)}
        className="h-12 w-3/10 flex-shrink-0 text-lg border border-gray-200 rounded-lg mt-6 shadow-sm pl-3 focus:outline-none"
      >
        <option value="" disabled>
          Select Role
        </option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      {error && (
        <div className="w-80 h-12 text-md border border-gray-200 rounded-lg shadow-md pl-3 bg-red-100 text-red-700 flex items-center justify-center">
          {error}
        </div>
      )}
      <button
        className="w-80 h-12 font-bold text-xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-lg mt-6 cursor-pointer shadow-sm"
        onClick={handleSubmit}
      >
        Grant Access
      </button>
    </div>
  );
};

export default Access;
