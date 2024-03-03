import CreateBook from "./widgets/CreateBook";
import Cards from "./components/Cards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <Container fluid className="bg-primary bg-gradient p-5">
      <Row>
        <h1 className="d-flex justify-content-center align-items-center pt-5 text-body-secondary">Si Buku</h1>
      </Row>
      <Row>
        <CreateBook />
      </Row>
      <Row xs={2} md={3} xl={4}>
        <Cards />
      </Row>
    </Container>
  );
}

export default App;
