import { Outlet } from "react-router-dom";

const Locations: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default Locations;
