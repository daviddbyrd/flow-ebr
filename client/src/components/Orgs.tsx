import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Orgs: React.FC = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("called fetch data");
    const data = await axios.get("http://localhost:3000/get-organisations");
    console.log("fetched data: ", data);
  };

  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default Orgs;
