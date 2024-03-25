import { useLoaderData, useParams, json } from "react-router-dom";
import CocktailItem from "../components/CocktailItem";
import MyCocktailItem from "../components/MyCocktailItem";

function MyCocktailDetailPage() {
  const { cocktailName } = useParams();

  const storedCocktails = localStorage.getItem("mycocktails");
  const cocktails = JSON.parse(storedCocktails);

  const cocktail = cocktails.find((drink) => drink.title === cocktailName);

  return <MyCocktailItem cocktail={cocktail} />;
}

export default MyCocktailDetailPage;
