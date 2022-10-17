import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((routeConfig, id) => {
            return (
              <Route
                key={id}
                path={routeConfig.path}
                exact={routeConfig.exact}
                element={routeConfig.element}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
