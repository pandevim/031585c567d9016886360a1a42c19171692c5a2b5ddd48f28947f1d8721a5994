const Card = ({ recipe, id }) => {
  return (
    <>
      {recipe._id && (
        <div className="card" style={styles.container} key={id}>
          <p>{recipe.name}</p>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {},
};

export default Card;
