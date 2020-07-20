import React, { useEffect, useState, Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    setLoadingData(true);
    const response = await fetch(
      "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=5"
    );
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoadingData(false);
  };

  return (
    <Fragment>
      <Container className="container">
        <Row>
          <Col>
            {loadingData && <Spinner animation="border" variant="primary" />}
            <h1 style={{ color: "green" }} className="headline">
              Cat Facts
            </h1>

            {data.map(facts => {
              return (
                <Card className="infotext">
                  <Card.Body key={facts.id}>{facts.text}</Card.Body>
                </Card>
              );
            })}
            {!loadingData && (
              <Button
                className="buttonMargin"
                variant="primary"
                size="lg"
                onClick={() => fetchdata()}
              >
                More Cat Facts!
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default App;
