import { Navbar, Nav, Container, Header } from "rsuite";
import { Link } from "react-router-dom";

const Layout = props => {
  return (
    <div className="layout" style={styles.container}>
      <Container>
        <Header>
          <Navbar>
            <Navbar.Header style={styles.header}>
              <Link to="/">EasierChef</Link>
            </Navbar.Header>
            <Navbar.Body>
              <Nav>
                <Nav.Item
                  componentClass={Link}
                  eventKey="dashboard"
                  to="/dashboard"
                >
                  Dashboard
                </Nav.Item>
              </Nav>
            </Navbar.Body>
          </Navbar>
        </Header>
        <Container style={styles.body}>{props.children}</Container>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Layout;
