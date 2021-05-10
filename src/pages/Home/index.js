import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "components";
import { TagPicker } from "rsuite";
import _ from "lodash";

const Home = () => {
  const form = useSelector(state => state.form);
  const [recipes, setRecipes] = useState([]);
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    setRecipes(form.recipes);
  }, [form.recipes]);

  useEffect(() => {
    const data = _.uniqBy(
      form.ingredients.map(ingredient => ({
        label: ingredient.name,
        value: `${ingredient.name},${form.ingredients
          .map(i => (i.name === ingredient.name ? i._id : null))
          .filter(value => value)
          .join()}`,
      })),
      "label"
    );
    setTagData(data);
  }, [form.ingredients]);

  const onChangeTag = tags => {
    const ingredients = [];
    for (let ingredient of tags.map(tag => tag.split(",").slice(1).join())) {
      ingredient.split(",").forEach(id => ingredients.push(id));
    }

    let filteredRecipes = form.recipes;
    if (!ingredients.includes("")) {
      filteredRecipes = form.recipes.filter(recipe =>
        ingredients.includes(recipe._id)
      );
    }
    setRecipes(filteredRecipes);
  };

  return (
    <div className="home" style={styles.container}>
      <div className="filter" style={styles.filter}>
        <TagPicker
          data={tagData}
          defaultValue={["all,"]}
          style={{ width: 300 }}
          menuStyle={{ width: 300 }}
          onChange={onChangeTag}
        />
      </div>
      <div className="recipes" style={styles.recipes}>
        {recipes.map((recipe, index) => (
          <Card recipe={recipe} key={index} id={index} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
};

export default Home;
