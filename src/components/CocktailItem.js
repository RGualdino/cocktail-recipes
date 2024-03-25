import { Link } from "react-router-dom";

import classes from "./CocktailItem.module.css";
import { FavouriteContext } from "../store/favourite-cocktails";
import { useContext, useState, useEffect } from "react";

function CocktailItem({ cocktail }) {
  const { cocktails, addFavourite, removeFavourite } =
    useContext(FavouriteContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const previousRoute = localStorage.getItem("previousRoute");

  useEffect(() => {
    const foundIndex = cocktails.cocktails.findIndex(
      (drink) => drink.idDrink === cocktail.idDrink
    );

    if (foundIndex !== -1) {
      setIsFavourite(true);
    }
  }, []);

  function handleAddFavourite(drink) {
    addFavourite(drink);
    setIsFavourite(true);
  }

  function handleRemoveFavourite(id) {
    removeFavourite(id);
    setIsFavourite(false);
  }

  // Extract ingredients and measurements from cocktailDetails
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measurement = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(
        `${measurement ? measurement.trim() + " " : ""}${ingredient}`
      );
    } else {
      break;
    }
  }

  return (
    <article className={classes.event}>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h4>Instructions:</h4>
      <p>{cocktail.strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <menu className={classes.actions}>
        {previousRoute === "/cocktails/favourites" && (
          <Link to="/cocktails/favourites">Back</Link>
        )}
        {previousRoute === "/cocktails" && <Link to="/cocktails">Back</Link>}
        {isFavourite && (
          <button onClick={() => handleRemoveFavourite(cocktail.idDrink)}>
            Remove Favourite
          </button>
        )}
        {!isFavourite && (
          <button onClick={() => handleAddFavourite(cocktail)}>
            Favourite
          </button>
        )}
      </menu>
    </article>
  );
}

export default CocktailItem;
