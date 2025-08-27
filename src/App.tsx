import { useLayoutEffect } from "react";
import { HashRouter } from "react-router-dom";

import NavBar from "./components/navigation/nav_bar";
import NavBarFooter from "./components/navigation/nav_bar_footer";
import TooltipsContainer from "./components/tooltips/tooltips_container";
import AppRoutes from "./pages/approutes";
import { useAppSelector } from "./store";

const App: React.FC = () => {
  const theme = useAppSelector((state) => state.options.items.theme);

  useLayoutEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <NavBar />
      <AppRoutes />
      <NavBarFooter />
      <TooltipsContainer />
    </HashRouter>
  );
};

export default App;
