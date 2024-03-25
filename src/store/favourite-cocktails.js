import { createContext, useState, useEffect } from "react";

export const FavouriteContext = createContext({
  cocktails: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});

export default function FavouriteContextProvider({ children }) {
  const [favourites, setFavourites] = useState({ cocktails: [] });

  useEffect(() => {
    //console.log("PRIMEIRO EFFECT");
    //console.log(localStorage.getItem("favorites"));
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavourites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    //console.log("SEGUNDO EFFECT");
    //console.log(localStorage.getItem("favorites"));
    localStorage.setItem("favorites", JSON.stringify(favourites));
  }, [favourites]);

  function handleAddCocktailToFavourites(cocktail) {
    setFavourites((prevFavourites) => {
      const updatedFavourites = [...prevFavourites.cocktails];

      updatedFavourites.push(cocktail);

      return { cocktails: updatedFavourites };
    });
    localStorage.setItem("favorites", JSON.stringify(favourites));
  }

  function handleRemoveCocktailFromFavourites(id) {
    setFavourites((prevFavourites) => {
      const drinks = [...prevFavourites.cocktails];
      const updatedFavourites = drinks.filter(
        (cocktail) => cocktail.idDrink !== id
      );
      return { cocktails: updatedFavourites };
    });
    localStorage.setItem("favorites", JSON.stringify(favourites));
  }

  const ctxValue = {
    cocktails: favourites,
    addFavourite: handleAddCocktailToFavourites,
    removeFavourite: handleRemoveCocktailFromFavourites,
  };

  return (
    <FavouriteContext.Provider value={ctxValue}>
      {children}
    </FavouriteContext.Provider>
  );
}
