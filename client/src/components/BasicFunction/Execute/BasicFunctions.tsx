import { Outlet } from "react-router-dom";

const BasicFunctions: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default BasicFunctions;
