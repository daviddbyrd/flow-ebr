import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/home/${e.currentTarget.name}`, { replace: true });
  };

  return (
    <div className="w-full h-full flex flex-row items-center justify-around">
      <button
        name="execute/organisation"
        className="h-4/10 w-4/10 font-bold text-7xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-3xl cursor-pointer shadow-sm flex flex-col justify-start items-center pt-10"
        onClick={(e) => handleNavigate(e)}
      >
        Execute
        <img src="/execute-icon.png" className="h-40 w-40" />
      </button>
      <button
        name="edit/organisation"
        className="h-4/10 w-4/10 font-bold text-7xl border border-gray-200 bg-green-300 hover:bg-green-400 rounded-3xl cursor-pointer shadow-sm flex flex-col justify-start items-center pt-10"
        onClick={(e) => handleNavigate(e)}
      >
        Edit or Create
        <img src="/create-edit-icon.png" className="h-40 w-40" />
      </button>
    </div>
  );
};

export default HomePage;
