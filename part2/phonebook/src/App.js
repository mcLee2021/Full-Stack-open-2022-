import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToDisplay, setPersonsToDisplay] = useState([]);
  const [newPerson, setNewPerson] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
      setPersonsToDisplay(response.data);
    });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const maxId = persons.map((person) => person.id).sort((a, b) => a - b)[
      persons.length - 1
    ];
    const newId = maxId + 1;
    setNewPerson({ ...newPerson, [name]: value, id: newId });
    console.log("button clicked", newPerson);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personsCopy = [...persons];
    const personsDup = personsCopy.filter(
      (person) => person.name === newPerson.name
    );
    console.log(personsDup);
    if (personsDup.length > 0) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, would you like to replace the old number with the new one?`
        )
      ) {
        personService
          .update(personsDup[0].id, newPerson)
          .then((response) => {
            console.log(response);
            const updatedPersons = persons.map((person) =>
              person.id !== response.data.id ? person : response.data
            );
            setPersons(updatedPersons);
            setPersonsToDisplay(updatedPersons);
            setMessage(`Updated ${newPerson.name}'s number`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => setMessage(error.response.data.error));
      }
    } else {
      personService
        .create(newPerson)
        .then((response) => {
          setMessage(`Added ${newPerson.name} to phonebook`);
          setPersons(persons.concat(response.data));
          setPersonsToDisplay(persons.concat(response.data));
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => setMessage(error.response.data));
    }
    setNewPerson({ name: "", number: "" });
  };

  const filterByName = (event) => {
    const search = event.target.value;
    setPersonsToDisplay(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(search);
      })
    );
    console.log(personsToDisplay);
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          setPersonsToDisplay(updatedPersons);
          setMessage(`Deleted ${name} from phonebook`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => setMessage(error.response.data));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filterByName={filterByName}></Filter>
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />

      <h2>Numbers</h2>
      <Persons
        personsToDisplay={personsToDisplay}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
