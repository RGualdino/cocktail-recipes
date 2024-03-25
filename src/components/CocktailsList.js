import { Link, useLocation } from "react-router-dom";

import classes from "./CocktailsList.module.css";

function CocktailsList({ cocktails }) {
  const location = useLocation();

  return (
    <div className={classes.events}>
      <h1>All Cocktails</h1>
      <ul className={classes.list}>
        {cocktails.map((cocktail) => (
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

export default CocktailsList;
