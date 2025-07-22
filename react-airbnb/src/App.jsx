import { memo } from "react";
import { useRoutes } from "react-router";
import routes from "./router";
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import { AppContainer } from "./components/app-container/style";

const App = memo(() => {
  const element = useRoutes(routes);
  return (
    <AppContainer>
      <AppHeader />
      <div className="page">{element}</div>
      <AppFooter />
    </AppContainer>
  );
});

export default App;