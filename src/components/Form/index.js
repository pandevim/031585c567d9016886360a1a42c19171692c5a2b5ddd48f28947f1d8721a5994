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
      <Formik
        initialValues={recipe}
        validate={({ name, url, steps, ingredients }) => {
          const errors = {};

          if (!name) {
            errors.name = "Required";
          } else if (!url) {
            errors.url = "Required";
          } else if (!steps[0].length) {
            errors.steps = "Required";
          } else if (
            !ingredients[0].name ||
            !ingredients[0].quantity ||
            !ingredients[0].unit
          ) {
            errors.ingredients = "Required";
          }

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form style={styles.form}>
            <fieldset>
              <label htmlFor="name">Recipe Name</label>
              <Field type="text" name="name" onChange={handleChange} />
              <ErrorMessage name="name" component="div" />
            </fieldset>

            <fieldset>
              <label htmlFor="url">Recipe Image Url</label>
              <Field type="url" name="url" onChange={handleChange} />
              <ErrorMessage name="url" component="div" />
            </fieldset>
            <fieldset>
              <label htmlFor="steps">Steps to make</label>
              <FieldArray name="steps">
                {arrayHelpers => (
                  <div>
                    {values.steps.map((step, index) => (
                      <div key={index}>
                        <label htmlFor={`steps.${index}`}>{index + 1}</label>
                        <Field name={`steps.${index}`} />
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            - Remove
                          </Button>
                        )}

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
              <ErrorMessage name="steps" component="div" />
            </fieldset>
            <fieldset>
              <label htmlFor="ingredients">Add Ingredients</label>
              <FieldArray name="ingredients">
                {arrayHelpers => (
                  <div>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index}>
                        <label htmlFor={`ingredients.${index}.name`}>
                          Name
                        </label>
                        <Field name={`ingredients.${index}.name`} />
                        <label htmlFor={`ingredients.${index}.quantity`}>
                          Quantity
                        </label>
                        <Field name={`ingredients.${index}.quantity`} />
                        <label htmlFor={`ingredients.${index}.unit`}>
                          Unit
                        </label>
                        <Field name={`ingredients.${index}.unit`} />
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            - Remove
                          </Button>
                        )}

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
              <ErrorMessage name="ingredients" component="div" />
            </fieldset>
            <fieldset>
              <Button type="submit" loading={isSubmitting}>
                Submit
              </Button>
            </fieldset>
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
