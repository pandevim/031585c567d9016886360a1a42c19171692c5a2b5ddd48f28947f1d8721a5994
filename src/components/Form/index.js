import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { saveRecipe, saveIngredient, saveDataLocally } from "./formSlice";

import { Button } from "rsuite";

import { uuid } from "utils";

const Page = () => {
  const recipe = useSelector(state => state.form.recipes[0]);
  const dispatch = useDispatch();

  const onSubmit = (values, { setSubmitting }) => {
    const _id = uuid();
    dispatch(saveRecipe({ ...values, _id }));
    dispatch(
      saveIngredient(
        values.ingredients.map(ingredient => {
          const name = ingredient.name;
          return { name, _id };
        })
      )
    );
    dispatch(saveDataLocally());
    setTimeout(() => setSubmitting(false), 400);
  };

  return (
    <div className="form" style={styles.container}>
      <Formik initialValues={recipe} onSubmit={onSubmit}>
        {({ isSubmitting, handleChange, values }) => (
          <Form style={styles.form}>
            <label for="name">Recipe Name</label>
            <Field type="text" name="name" onChange={handleChange} />
            <ErrorMessage name="name" component="div" />
            <label for="url">Recipe Image Url</label>
            <Field type="text" name="url" onChange={handleChange} />
            <ErrorMessage name="url" component="div" />
            <label for="steps">Steps to make</label>
            <FieldArray name="steps">
              {arrayHelpers => (
                <div>
                  {values.steps.map((step, index) => (
                    <div key={index}>
                      <label for={`steps.${index}`}>{index + 1}</label>
                      <Field name={`steps.${index}`} />
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        - Remove
                      </Button>

                      <Button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        + Add
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <label for="ingredients">Add Ingredients</label>
            <FieldArray name="ingredients">
              {arrayHelpers => (
                <div>
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <Field name={`ingredients.${index}.name`} />
                      <Field name={`ingredients.${index}.quantity`} />
                      <Field name={`ingredients.${index}.unit`} />
                      <Button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        - Remove
                      </Button>

                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            name: "",
                            quantity: "",
                            unit: "",
                          });
                        }}
                      >
                        + Add
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const styles = {
  container: {},
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Page;
