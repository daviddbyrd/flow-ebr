import { Outlet } from "react-router-dom";

const ProcessUnits: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default ProcessUnits;
