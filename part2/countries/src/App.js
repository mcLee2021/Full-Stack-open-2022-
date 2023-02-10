import { useEffect, useState } from "react";

import axios from "axios";
import Countries from "./components/Countries";
import Country from "./components/Country";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToDisplay, setCountriesToDisplay] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setCountriesToDisplay(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  return (
    <div>
      find countries
      <input type="text" name={query} onChange={handleChange} />
      {countriesToDisplay.length === 1 ? (
        <Country country={countriesToDisplay[0]} />
      ) : null}
      {countriesToDisplay.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <Countries
          countriesToDisplay={countriesToDisplay}
          setCountriesToDisplay={setCountriesToDisplay}
        />
      )}
    </div>
  );
}

export default App;
