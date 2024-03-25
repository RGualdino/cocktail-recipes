import { Link, useNavigate } from "react-router-dom";

import classes from "./CocktailItem.module.css";
import { FavouriteContext } from "../store/favourite-cocktails";
import { useContext, useState, useEffect } from "react";

function MyCocktailItem({ cocktail }) {
  const navigate = useNavigate();

  function handleEditCocktail(drink) {}

  function handleRemoveCocktail(cocktailName) {
    const storedCocktails = localStorage.getItem("mycocktails");
    const cocktails = JSON.parse(storedCocktails);

    const updatedCocktails = cocktails.filter(
      (drink) => drink.title !== cocktailName
    );

    localStorage.setItem("mycocktails", JSON.stringify(updatedCocktails));

    navigate("/cocktails/mycocktails");
  }

  return (
    <article className={classes.event}>
      <h1>{cocktail.title}</h1>
      <img src={cocktail.image} alt={cocktail.title} />
      <h4>Instructions:</h4>
      <p>{cocktail.instructions}</p>
      <h4>Ingredients:</h4>
      <p>{cocktail.ingredients}</p>
      <menu className={classes.actions}>
        <Link to="/cocktails/mycocktails">Back</Link>
        <Link to={`/cocktails/${cocktail.title}/edit`}>Edit</Link>
        <button onClick={() => handleRemoveCocktail(cocktail.title)}>
          Delete
        </button>
      </menu>
    </article>
  );
}

export default MyCocktailItem;
