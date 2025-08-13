import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { setUserId, setIsLoggedIn } = useAuth();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/home/${e.currentTarget.name}`, { replace: true });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="fixed w-full h-12 backdrop-blur flex flex-row justify-left items-center top-0 border-b border-gray-100">
      <div className="ml-10 cursor-pointer text-lg font-bold">Flow EBR</div>
      <button
        name="execute/organisation"
        onClick={(e) => handleNavigate(e)}
        className="ml-32 cursor-pointer text-lg text-gray-600"
      >
        Execute
      </button>
      <button
        name="edit/organisation"
        onClick={(e) => handleNavigate(e)}
        className="ml-32 cursor-pointer text-lg text-gray-600"
      >
        Create/Edit
      </button>
      <button
        name="access"
        onClick={(e) => handleNavigate(e)}
        className="ml-32 cursor-pointer text-lg text-gray-600"
      >
        Access
      </button>
      <button
        onClick={logOut}
        className="ml-32 cursor-pointer text-lg text-gray-600 text-red-500 ml-auto mr-10"
      >
        Log out
      </button>
    </div>
  );
};

export default NavBar;
