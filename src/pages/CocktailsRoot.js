import { Outlet } from "react-router-dom";

import CocktailsNavigation from "../components/CocktailsNavigation";

function CocktailsRootLayout() {
  return (
    <>
      <CocktailsNavigation />
      <Outlet></Outlet>
    </>
  );
}

export default CocktailsRootLayout;
