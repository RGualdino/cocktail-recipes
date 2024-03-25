import { useContext } from "react";
import CocktailsList from "../components/CocktailsList";
import { FavouriteContext } from "../store/favourite-cocktails";

import { Link, useLoaderData, json } from "react-router-dom";

function CocktailsPage() {
  const cocktails = useLoaderData();

  return <CocktailsList cocktails={cocktails} />;
}

export default CocktailsPage;

export async function loader() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.drinks;
  }
}
