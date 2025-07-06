import { Outlet } from "react-router-dom";

const Organisations: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default Organisations;
