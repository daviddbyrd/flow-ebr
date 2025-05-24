import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Execute from "./components/Execute";
import Orgs from "./components/Orgs";
import OrgList from "./components/OrgList";
import Org from "./components/Org";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="execute" element={<Execute />}>
            <Route path="orgs" element={<Orgs />}>
              <Route index element={<OrgList />} />
              <Route path=":orgId" element={<Org />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
