import classes from "./CocktailsList.module.css";
import { FavouriteContext } from "../store/favourite-cocktails";
import { useContext } from "react";
import CocktailsList from "./CocktailsList";
import { Link, useLocation } from "react-router-dom";

function FavouritsList() {
  const { cocktails } = useContext(FavouriteContext);
  const location = useLocation();

  const drinks = cocktails.cocktails;

  if (drinks.length < 1) {
    return (
      <div className={classes.events}>
        <h1>Favourites</h1>
        <h4>You don't have any cocktail in your favourite list yet.</h4>
      </div>
    );
  }

  return (
    <div className={classes.events}>
      <h1>Favourites</h1>
      <ul className={classes.list}>
        {drinks.map((cocktail) => (
          <li key={cocktail.idDrink} className={classes.item}>
            <Link
              to={`/cocktails/${cocktail.idDrink}`}
              onClick={() => {
                localStorage.setItem("previousRoute", location.pathname);
              }}
            >
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <div className={classes.content}>
                <h2>{cocktail.strDrink}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavouritsList;
