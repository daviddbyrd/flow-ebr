import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/${e.currentTarget.name}`, { replace: true });
  };

  return (
    <div className="fixed w-full h-12 backdrop-blur flex flex-row justify-left items-center top-0 border-b border-gray-100">
      <div className="ml-10 cursor-pointer text-lg font-bold">Flow MES</div>
      <button
        name="execute"
        onClick={(e) => handleNavigate(e)}
        className="ml-32 cursor-pointer text-lg text-gray-600"
      >
        Execute
      </button>
      <button
        name="create"
        onClick={(e) => handleNavigate(e)}
        className="ml-32 cursor-pointer text-lg text-gray-600"
      >
        Create
      </button>
    </div>
  );
};

export default NavBar;
