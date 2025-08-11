import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Organisations from "./components/Organisation/Organisations";
import OrganisationList from "./components/Organisation/OrganisationList";
import Organisation from "./components/Organisation/Organisation";
import Locations from "./components/Location/Locations";
import LocationList from "./components/Location/LocationList";
import Location from "./components/Location/Location";
import ProcessUnits from "./components/ProcessUnit/ProcessUnits";
import ProcessUnitList from "./components/ProcessUnit/ProcessUnitList";
import ProcessUnit from "./components/ProcessUnit/ProcessUnit";
import ProductionOrders from "./components/ProductionOrder/ProductionOrders";
import ProductionOrderList from "./components/ProductionOrder/ProductionOrderList";
import ProductionOrder from "./components/ProductionOrder/ProductionOrder";
import BasicFunctions from "./components/BasicFunction/Execute/BasicFunctions";
import BasicFunctionList from "./components/BasicFunction/Execute/BasicFunctionList";
import BasicFunction from "./components/BasicFunction/Execute/BasicFunction";
import EditOrganisations from "./components/Organisation/EditOrganisations";
import EditOrganisationsMenu from "./components/Organisation/EditOrganisationsMenu";
import CreateOrganisation from "./components/Organisation/CreateOrganisation";
import EditOrganisation from "./components/Organisation/EditOrganisation";
import EditOrganisationMenu from "./components/Organisation/EditOrganisationMenu";
import CreateLocation from "./components/Location/CreateLocation";
import EditLocation from "./components/Location/EditLocation";
import EditLocationMenu from "./components/Location/EditLocationMenu";
import EditProcessUnit from "./components/ProcessUnit/EditProcessUnit";
import CreateProcessUnit from "./components/ProcessUnit/CreateProcessUnit";
import EditProcessUnitMenu from "./components/ProcessUnit/EditProcessUnitMenu";
import CreateProductionOrder from "./components/ProductionOrder/CreateProductionOrder";
import EditProductionOrder from "./components/ProductionOrder/EditProductionOrder";
import EditProductionOrderMenu from "./components/ProductionOrder/EditProductionOrderMenu";
import CreateBasicFunction from "./components/BasicFunction/CreateEdit/CreateBasicFunction";
import EditBasicFunction from "./components/BasicFunction/CreateEdit/EditBasicFunction";
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
                      <Route path=":processUnitId" element={<ProcessUnit />}>
                        <Route
                          path="production-order"
                          element={<ProductionOrders />}
                        >
                          <Route index element={<ProductionOrderList />} />
                          <Route
                            path=":productionOrderId"
                            element={<ProductionOrder />}
                          >
                            <Route
                              path="basic-function"
                              element={<BasicFunctions />}
                            >
                              <Route index element={<BasicFunctionList />} />
                              <Route
                                path=":basicFunctionId"
                                element={<BasicFunction />}
                              />
                            </Route>
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="edit/organisation" element={<EditOrganisations />}>
              <Route index element={<EditOrganisationsMenu />} />
              <Route path="new" element={<CreateOrganisation />} />
              <Route path=":organisationId" element={<EditOrganisation />}>
                <Route index element={<EditOrganisationMenu />} />
                <Route path="location/new" element={<CreateLocation />} />
                <Route path="location/:locationId" element={<EditLocation />}>
                  <Route index element={<EditLocationMenu />} />
                  <Route
                    path="process-unit/new"
                    element={<CreateProcessUnit />}
                  />
                  <Route
                    path="process-unit/:processUnitId"
                    element={<EditProcessUnit />}
                  >
                    <Route index element={<EditProcessUnitMenu />} />
                    <Route
                      path="production-order/new"
                      element={<CreateProductionOrder />}
                    />
                    <Route
                      path="production-order/:productionOrderId"
                      element={<EditProductionOrder />}
                    >
                      <Route index element={<EditProductionOrderMenu />} />
                      <Route
                        path="basic-function/:basicFunctionId"
                        element={<CreateBasicFunction />}
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
