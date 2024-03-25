import {
  Form,
  useNavigation,
  useNavigate,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "./CocktailForm.module.css";

function CocktailForm({ method, cocktail }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("/cocktails/mycocktails");
  }

  console.log(cocktail);

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={cocktail ? cocktail.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={cocktail ? cocktail.image : ""}
        />
      </p>
      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          type="text"
          name="instructions"
          required
          defaultValue={cocktail ? cocktail.instructions : ""}
        />
      </p>
      <p>
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          type="text"
          name="ingredients"
          required
          defaultValue={cocktail ? cocktail.ingredients : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default CocktailForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const cocktailName = params.cocktailName;

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    instructions: data.get("instructions"),
    ingredients: data.get("ingredients"),
  };

  if (method === "POST") {
    const storedCocktails = localStorage.getItem("mycocktails");
    if (!storedCocktails) {
      const updatedCocktails = [];
      updatedCocktails.push(eventData);
      localStorage.setItem("mycocktails", JSON.stringify(updatedCocktails));
    } else {
      const cocktails = JSON.parse(storedCocktails);
      cocktails.push(eventData);
      localStorage.setItem("mycocktails", JSON.stringify(cocktails));
    }
  }

  if (method === "PATCH") {
    const storedCocktails = localStorage.getItem("mycocktails");
    const cocktails = JSON.parse(storedCocktails);

    const updatedCocktails = cocktails.filter(
      (drink) => drink.title !== cocktailName
    );
    console.log(updatedCocktails);
    updatedCocktails.push(eventData);
    localStorage.setItem("mycocktails", JSON.stringify(updatedCocktails));
  }

  return redirect("/cocktails/mycocktails");
}
