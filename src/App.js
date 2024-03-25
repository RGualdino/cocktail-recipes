import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import CocktailsPage, { loader as cocktailsLoader } from "./pages/Cocktails";
import CocktailDetailPage, {
  loader as cocktailDetailsLoader,
} from "./pages/CocktailDetail";
import NewCocktailPage from "./pages/NewCocktail";
import EditCocktailPage from "./pages/EditCocktail";
import RootLayout from "./pages/Root";
import CocktailsRootLayout from "./pages/CocktailsRoot";
import FavouriteContextProvider from "./store/favourite-cocktails";
import FavouritesPage from "./pages/Favourites";
import MyCocktailsPage from "./pages/MyCocktails";
import { action as manipulateCocktailAction } from "./components/CocktailForm";
import { loader as myCocktailLoader } from "./pages/MyCocktails";
import { loader as myCocktailDetailsLoader } from "./pages/MyCocktailDetail";
import MyCocktailDetailPage from "./pages/MyCocktailDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cocktails",
        element: <CocktailsRootLayout />,
        children: [
          { index: true, element: <CocktailsPage />, loader: cocktailsLoader },
          {
            path: ":cocktailId",
            element: <CocktailDetailPage />,
            loader: cocktailDetailsLoader,
          },
          { path: "favourites", element: <FavouritesPage /> },
          {
            path: "mycocktails",
            element: <MyCocktailsPage />,
          },
          {
            path: "mycocktails/new",
            element: <NewCocktailPage />,
            action: manipulateCocktailAction,
          },
          {
            path: "mycocktails/:cocktailName",
            element: <MyCocktailDetailPage />,
          },
          {
            path: ":cocktailName/edit",
            element: <EditCocktailPage />,
            action: manipulateCocktailAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <FavouriteContextProvider>
      <RouterProvider router={router} />
    </FavouriteContextProvider>
  );
}

export default App;
