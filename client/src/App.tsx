import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Execute from "./components/Execute";
import Orgs from "./components/Orgs";
import OrgList from "./components/OrgList";
import Org from "./components/Org";
import Create from "./components/Create";
import AuthScreenRedirect from "./utils/AuthScreenRedirect";
import RequireLoggedIn from "./utils/RequireLoggedIn";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <RequireLoggedIn>
                <Home />
              </RequireLoggedIn>
            }
          >
            <Route path="execute" element={<Execute />}>
              <Route path="orgs" element={<Orgs />}>
                <Route index element={<OrgList />} />
                <Route path=":orgId" element={<Org />} />
              </Route>
            </Route>

            <Route path="create" element={<Create />}></Route>
          </Route>
          <Route path="/" element={<AuthScreenRedirect />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
