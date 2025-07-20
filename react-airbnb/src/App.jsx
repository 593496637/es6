import { memo } from "react";
import { useRoutes } from "react-router";
import routes from "./router";
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";

const App = memo(() => {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <AppHeader />
      <div className="page">{element}</div>
      <AppFooter />
    </div>
  );
});

export default App;