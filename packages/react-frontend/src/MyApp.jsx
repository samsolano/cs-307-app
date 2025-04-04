import React, { useState } from "react";
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