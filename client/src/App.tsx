import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Organisations from "./components/Organisations";
import OrganisationList from "./components/OrganisationList";
import Organisation from "./components/Organisation";
import Locations from "./components/Locations";
import LocationList from "./components/LocationList";
import Location from "./components/Location";
import ProcessUnits from "./components/ProcessUnits";
import ProcessUnitList from "./components/ProcessUnitList";
import ProcessUnit from "./components/ProcessUnit";
import CreateOrganisations from "./components/CreateOrganisations";
import CreateOrganisationMenu from "./components/CreateOrganisationMenu";
import CreateOrganisation from "./components/CreateOrganisation";
import EditOrganisation from "./components/EditOrganisation";
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
            <Route path="execute/organisation" element={<Organisations />}>
              <Route index element={<OrganisationList />} />
              <Route path=":organisationId" element={<Organisation />}>
                <Route path="location" element={<Locations />}>
                  <Route index element={<LocationList />} />
                  <Route path=":locationId" element={<Location />}>
                    <Route path="process-unit" element={<ProcessUnits />}>
                      <Route index element={<ProcessUnitList />} />
                      <Route path=":processUnitId" element={<ProcessUnit />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="create/organisation" element={<CreateOrganisations />}>
              <Route index element={<CreateOrganisationMenu />} />
              <Route path="new-organisation" element={<CreateOrganisation />} />
              <Route path=":organisationId" element={<EditOrganisation />}>
                <Route path="process-unit" element={<EditProcessUnits />}>
                  <Route index element={<EditProcessUnitMenu />} />
                  <Route path=":processUnitId" element={<EditProcessUnit />} />
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
