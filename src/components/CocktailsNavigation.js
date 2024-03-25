import { NavLink } from "react-router-dom";

import classes from "./CocktailsNavigation.module.css";

function CocktailsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/cocktails"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Cocktails
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cocktails/mycocktails"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              My Cocktails
            </NavLink>
          </li>
          <li>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default CocktailsNavigation;
