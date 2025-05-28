import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Organisations from "./components/Organisations";
import OrganisationList from "./components/OrganisationList";
import Organisation from "./components/Organisation";
import Locations from "./components/Locations";
import LocationList from "./components/LocationList";
import Location from "./components/Location";
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
            <Route path="organisation" element={<Organisations />}>
              <Route index element={<OrganisationList />} />
              <Route path=":organisationId" element={<Organisation />}>
                <Route path="location" element={<Locations />}>
                  <Route index element={<LocationList />} />
                  <Route path=":locationId" element={<Location />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="/" element={<AuthScreenRedirect />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
