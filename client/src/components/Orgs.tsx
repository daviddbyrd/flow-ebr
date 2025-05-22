import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Orgs: React.FC = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Orgs;
