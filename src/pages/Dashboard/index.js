import Form from "components/Form";
import { Home } from "pages";

const Dashboard = () => {
  return (
    <div className="Dashboard" style={styles.container}>
      <Form />
      <br></br>
      <Home />
    </div>
  );
};

const styles = {
  container: {},
};

export default Dashboard;
