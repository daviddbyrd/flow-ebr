import { HashRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="orgs" element={<Orgs />}>
            <Route path=":orgId" element={<Org />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
