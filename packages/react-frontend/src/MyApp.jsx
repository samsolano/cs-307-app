import React, { useState } from "react";
import Table from "./Table";

function MyApp() {

    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor"
          },
          {
            name: "Mac",
            job: "Bouncer"
          },
          {
            name: "Dee",
            job: "Aspring actress"
          },
          {
            name: "Dennis",
            job: "Bartender"
          }
      ]);

      function removeOneCharacter(index) {
        
        const updatedList = characters.filter((character, i) => {

            if (i == index) {
                return false;
            }
            return true;
        });
        setCharacters(updatedList);
      }

    return (
      <div className="container">
        <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter}
        />
      </div>
    );
  }
export default MyApp;