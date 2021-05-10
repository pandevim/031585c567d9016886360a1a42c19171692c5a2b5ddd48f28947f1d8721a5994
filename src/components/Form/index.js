import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { saveRecipe, saveIngredient, saveDataLocally } from "./formSlice";

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
          <Form>
            <Field type="text" name="name" onChange={handleChange} />
            <ErrorMessage name="name" component="div" />
            <Field type="text" name="url" onChange={handleChange} />
            <ErrorMessage name="url" component="div" />
            <FieldArray name="steps">
              {arrayHelpers => (
                <div>
                  {values.steps.map((step, index) => (
                    <div key={index}>
                      <Field name={`steps.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>

                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <FieldArray name="ingredients">
              {arrayHelpers => (
                <div>
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <Field name={`ingredients.${index}.name`} />
                      <Field name={`ingredients.${index}.quantity`} />
                      <Field name={`ingredients.${index}.unit`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({
                            name: "",
                            quantity: "",
                            unit: "",
                          });
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const styles = {
  container: {},
};

export default Page;
