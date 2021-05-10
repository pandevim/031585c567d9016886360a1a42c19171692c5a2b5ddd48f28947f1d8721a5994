import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "helpers";
import { Layout } from "components";

const App = () => {
  return (
    <div className="App" style={styles.container}>
      <Router>
        <Layout>
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  exact={true}
                  path={prop.path}
                  key={key}
                  component={prop.component}
                />
              );
            })}
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

const styles = {
  container: {},
};

export default App;
