import classes from "./Home.module.css";

function Home({ title, description }) {
  return (
    <div className={classes.events}>
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );
}

export default Home;
