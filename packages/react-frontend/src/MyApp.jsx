import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {

    const [characters, setCharacters] = useState([]);


      function removeOneCharacter(index) {
        const charID = characters[index]._id;

        fetch(`http://localhost:8000/users/${charID}`, {
          method: "DELETE",
        })
          .then(response => {
            console.log("DELETE status:", response.status);
            if (!response.ok) {
              throw new Error(`Delete failed: ${response.status}`);
            }
            // Only update state once the server confirms deletion:
            setCharacters(chars => chars.filter(c => c._id !== charID));
          })
          .catch(err => {
            console.error("Failed to delete user:", err);
          });
    }


      function updateList(person) {
        postUser(person)
        .then(response => {
          console.log("POST status:", response.status);
          
          if (response.status !== 201) {
            throw new Error(`Server responded ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setCharacters([...characters, data]);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
      }


      function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(person)
        });
      
        return promise;
      }

      useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json))
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