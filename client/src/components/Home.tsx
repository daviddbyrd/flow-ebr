import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  console.log("home");
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="mt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
