import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="w-full h-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Home;
