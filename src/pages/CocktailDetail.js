import { useLoaderData, useParams, json } from "react-router-dom";
import CocktailItem from "../components/CocktailItem";

function CocktailDetailPage() {
  const data = useLoaderData();
  const cocktail = data.drinks[0];

  return <CocktailItem cocktail={cocktail} />;
}

export default CocktailDetailPage;

export async function loader({ params }) {
  const id = params.cocktailId;

  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected cocktail." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}
