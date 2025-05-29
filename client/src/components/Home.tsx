import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  console.log("home");
  return (
    <div className="w-screen h-screen flex flex-col">
      <NavBar />
      <div className="pt-12 flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
