import { createContext, useState, useEffect } from "react";

export const MyCocktailsContext = createContext({
  cocktails: [],
  addCocktail: () => {},
  removeCocktail: () => {},
});

export default function MyCocktailsContextProvider({ children }) {
  const [myCocktails, setMyCocktails] = useState({ cocktails: [] });

  useEffect(() => {
    const storedMyCocktails = localStorage.getItem("mycocktails");
    if (storedMyCocktails) {
      setMyCocktails(JSON.parse(storedMyCocktails));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mycocktails", JSON.stringify(myCocktails));
  }, [myCocktails]);

  function handleAddCocktail(cocktail) {
    setMyCocktails((prevMyCocktails) => {
      const updatedMyCocktails = [...prevMyCocktails.cocktails];

      updatedMyCocktails.push(cocktail);

      return { cocktails: updatedMyCocktails };
    });
    localStorage.setItem("mycocktails", JSON.stringify(myCocktails));
  }

  function handleRemoveCocktail(title) {
    setMyCocktails((prevMyCocktails) => {
      const drinks = [...prevMyCocktails.cocktails];
      const updatedMyCocktails = drinks.filter(
        (cocktail) => cocktail.title !== title
      );
      return { cocktails: updatedMyCocktails };
    });
    localStorage.setItem("mycocktails", JSON.stringify(myCocktails));
  }

  const ctxValue = {
    cocktails: myCocktails,
    addCocktail: handleAddCocktail,
    removeCocktail: handleRemoveCocktail,
  };

  return (
    <MyCocktailsContext.Provider value={ctxValue}>
      {children}
    </MyCocktailsContext.Provider>
  );
}
