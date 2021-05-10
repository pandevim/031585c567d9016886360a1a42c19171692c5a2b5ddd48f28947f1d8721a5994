import { Navbar, Nav, Container, Header, Footer } from "rsuite";
import { Link } from "react-router-dom";

const Layout = props => {
  return (
    <div className="layout" style={styles.container}>
      <Container>
        <Header>
          <Navbar>
            <Navbar.Header>
              <Link to="/">EasierChef</Link>
            </Navbar.Header>
            <Navbar.Body>
              <Nav>
                <Nav.Item eventKey="home">
                  <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item eventKey="dashboard">
                  <Link to="/dashboard">Dashboard</Link>
                </Nav.Item>
              </Nav>
            </Navbar.Body>
          </Navbar>
        </Header>
        <Container>{props.children}</Container>
        <Footer>Footer</Footer>
      </Container>
    </div>
  );
};

const styles = {
  container: {},
};

export default Layout;
