const Card = ({ recipe, id }) => {
  return (
    <>
      {recipe._id && (
        <div className="card" style={styles.container} key={id}>
          <h1>{recipe.name}</h1>
          <img src={recipe.url} alt={recipe.name} style={styles.image}></img>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>step</li>
            ))}
          </ol>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span>{ingredient.name}, </span>
                <span>{ingredient.quantity}, </span>
                <span>{ingredient.unit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {},
  image: {
    maxWidth: 400,
  },
};

export default Card;
