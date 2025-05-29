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
import EditOrganisations from "./components/EditOrganisations";
import EditOrganisationsMenu from "./components/EditOrganisationsMenu";
import CreateOrganisation from "./components/CreateOrganisation";
import EditOrganisation from "./components/EditOrganisation";
import EditOrganisationMenu from "./components/EditOrganisationMenu";
import CreateLocation from "./components/CreateLocation";
import EditLocation from "./components/EditLocation";
import EditLocationMenu from "./components/EditLocationMenu";
import EditProcessUnit from "./components/EditProcessUnit";
import CreateProcessUnit from "./components/CreateProcessUnit";
import EditProcessUnitMenu from "./components/EditProcessUnitMenu";
import CreateProductionOrder from "./components/CreateProductionOrder";
import EditProductionOrder from "./components/EditProductionOrder";
import EditProductionOrderMenu from "./components/EditProductionOrderMenu";
import CreateBasicFunction from "./components/CreateBasicFunction";
import EditBasicFunction from "./components/EditBasicFunction";
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

            <Route path="edit/organisation" element={<EditOrganisations />}>
              <Route index element={<EditOrganisationsMenu />} />
              <Route path="new-organisation" element={<CreateOrganisation />} />
              <Route path=":organisationId" element={<EditOrganisation />}>
                <Route index element={<EditOrganisationMenu />} />
                <Route path="new-location" element={<CreateLocation />} />
                <Route path="location/:locationId" element={<EditLocation />}>
                  <Route index element={<EditLocationMenu />} />
                  <Route
                    path="new-process-unit"
                    element={<CreateProcessUnit />}
                  />
                  <Route
                    path="process-unit/:processUnitId"
                    element={<EditProcessUnit />}
                  >
                    <Route index element={<EditProcessUnitMenu />} />
                    <Route
                      path="new-production-order"
                      element={<CreateProductionOrder />}
                    />
                    <Route
                      path="production-order/:productionOrderId"
                      element={<EditProductionOrder />}
                    >
                      <Route index element={<EditProductionOrderMenu />} />
                      <Route
                        path="new-basic-function"
                        element={<CreateBasicFunction />}
                      />
                      <Route
                        path="basic-function/:basicFunctionId"
                        element={<EditBasicFunction />}
                      />
                    </Route>
                  </Route>
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
