import { useParams } from "react-router-dom";

import CocktailForm from "../components/CocktailForm";

function EditCocktailPage() {
  const cocktailName = useParams();
  const name = cocktailName.cocktailName;

  const storedCocktails = localStorage.getItem("mycocktails");
  const cocktails = JSON.parse(storedCocktails);

  const drink = cocktails.filter((item) => item.title === name)[0];

  return (
    <>
      <h1>EditCocktailPage</h1>;
      <CocktailForm method="patch" cocktail={drink} />
    </>
  );
}

export default EditCocktailPage;
