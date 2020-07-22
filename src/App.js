import React, { useEffect, useState, useCallback } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const baseUrl = "https://cat-fact.herokuapp.com/facts/";
const listUrl = baseUrl + "random?animal_type=cat&amount=5";

const App = () => {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const loadData = useCallback(async () => {
    try {
      setLoadingData(true);
      const resp = await fetch(listUrl);
      const data = await resp.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  }, [setData, setLoadingData]);
  useEffect(() => {
    loadData();
  }, [loadData]);

  // There doesn't seem to be a human-readable URL for the facts, so using the API permalink

  return (
    <>
      {loadingData && (
        <Spinner
          className="loadingSpinner"
          animation="border"
          variant="primary"
        />
      )}
      <h1 className="headline">Cat Facts</h1>
      <textarea
        className="infoText"
        rows={10}
        value={data.map(e => `[${e.text}] (${baseUrl}${e._id})`).join("\n")}
      />

      {!loadingData && (
        <Button
          className="buttonMargin"
          variant="primary"
          size="lg"
          onClick={() => loadData()}
        >
          More Cat Facts!
        </Button>
      )}
    </>
  );
};
export default App;
