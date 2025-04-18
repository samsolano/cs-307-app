import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

    const [characters, setCharacters] = useState([]);

      function removeOneCharacter(index) {
        const updatedList = characters.filter((character, i) => {

            if (i == index) {
                return false;
            }
            return true;
        });
        setCharacters(updatedList);
      }

      function updateList(person) {
        setCharacters([...characters, person]);
      }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
      }

      useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
      <div className="container">
        <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList}/>
      </div>
    );
  }
export default MyApp;