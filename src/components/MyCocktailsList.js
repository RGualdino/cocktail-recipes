import { Link, useNavigate } from "react-router-dom";

import classes from "./CocktailsList.module.css";

function MyCocktailsList() {
  const navigate = useNavigate();
  const storedCocktails = localStorage.getItem("mycocktails");
  const cocktails = JSON.parse(storedCocktails);

  if (!storedCocktails) {
    return (
      <div className={classes.events}>
        <h1>My Cocktails</h1>
        <div className={classes.actions}>
          <Link to="new">New Cocktail</Link>
        </div>
        <h4>You don't have any cocktail yet.</h4>
      </div>
    );
  }

  return (
    <>
      <div className={classes.events}>
        <h1>My Cocktails</h1>
        <div className={classes.actions}>
          <Link to="new">New Cocktail</Link>
        </div>
        <ul className={classes.list}>
          {cocktails.map((cocktail) => (
            <li key={cocktail.title} className={classes.item}>
              <Link to={`/cocktails/mycocktails/${cocktail.title}`}>
                <img src={cocktail.image} alt={cocktail.title} />
                <div className={classes.content}>
                  <h2>{cocktail.title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MyCocktailsList;
